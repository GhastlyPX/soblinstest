import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { Cron } from '@nestjs/schedule';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { HOUSE_WALLET } from 'constants/constants';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';

@Injectable()
export class MissedGamesCron {
  private readonly logger = new Logger(MissedGamesCron.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  @Cron('0 */30 * * * *')
  async payMissedGames() {
    let connection = new Connection(
      this.config.get<string>('ANCHOR_PROVIDER_URL')!,
    );
    const signer = anchor.web3.Keypair.fromSecretKey(
      bs58.decode(this.config.get<string>('ANCHOR_WALLET')!),
    );
    let wallet = new NodeWallet(signer);
    const provider: any = new anchor.AnchorProvider(connection, wallet, {
      commitment: 'finalized',
    });
    this.logger.log('STARTING MISSED PAYOUTS');

    const payouts = await this.prisma.games.findMany({
      where: {
        outcome: true,
        processed: false,
      },
    });

    if (!payouts) {
      return;
    }

    if (payouts) {
      try {
        for (let payout = 0; payout < payouts.length; payout++) {
          let player = payouts[payout].player;
          let solToPayout = parseInt(payouts[payout].winAmount.toString());
          let signature = payouts[payout].signature;

          try {
            const transaction = new Transaction().add(
              SystemProgram.transfer({
                fromPubkey: new PublicKey(HOUSE_WALLET),
                toPubkey: new PublicKey(player),
                lamports: solToPayout,
              }),
            );

            const txid = await provider.sendAndConfirm(transaction, [], {
              commitment: 'finalized',
            });

            this.logger.log(txid);

            const update = await this.prisma.games.update({
              where: {
                signature: signature,
              },
              data: {
                processed: true,
                payoutSignature: txid,
                cronProcess: true,
              },
            });
            this.logger.log(update);
          } catch (error) {
            this.logger.log(error);
            payout++;
          }
        }
      } catch (error) {
        this.logger.error(error);
      }
    }

    console.log('payouts', payouts);

    this.logger.log('ENDING MISSED PAYOUTS');
  }
}
