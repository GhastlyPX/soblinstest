import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { web3 } from '@project-serum/anchor';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { Job } from 'bull';
import * as anchor from '@project-serum/anchor';
import { PrismaService } from 'src/prisma.service';
import { HOUSE_WALLET } from 'constants/constants';
import { ConfigService } from '@nestjs/config';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';

/**
 * Processes the winning transactions.
 * @param job A job object with the following params.
 * @param reciever The game players wallet address.
 * @param amount The amount of sol to return to the winner (bet amount + winnings).
 * @returns Win or lose.
 */

@Processor('games')
export class PlayProcessor {
  private readonly logger = new Logger(PlayProcessor.name);
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  @Process('processWin')
  async processGame(job: Job) {
    let connection = new Connection(
      this.config.get<string>('ANCHOR_PROVIDER_URL')!,
    );
    const signer = web3.Keypair.fromSecretKey(
      bs58.decode(this.config.get<string>('ANCHOR_WALLET')!),
    );
    let wallet = new NodeWallet(signer);
    const provider: any = new anchor.AnchorProvider(connection, wallet, {
      commitment: 'finalized',
    });

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(HOUSE_WALLET),
          toPubkey: new PublicKey(job?.data?.reciever),
          lamports: job.data.solToPayout,
        }),
      );

      const txid = await provider.sendAndConfirm(transaction, [], {
        commitment: 'finalized',
      });
      //Here we update the win after processing payout
      if (txid) {
        const updateWin = await this.prisma.games.update({
          where: {
            signature: job?.data?.txid,
          },
          data: {
            player: job?.data?.reciever,
            outcome: true,
            processed: true,
            payoutSignature: txid,
          },
        });
        if (updateWin) {
          return true;
          //if updating the win failed we log the reason
        } else if (!updateWin) {
          this.logger.error(
            'ERROR UPDATING WIN RESULTS, TXID:',
            job?.data?.txid,
          );
        }
      } else if (!txid) {
        //add failed process to database
        await this.prisma.games.update({
          where: {
            signature: job?.data?.txid,
          },
          data: {
            player: job?.data?.reciever,
            outcome: true,
            processed: false,
          },
        });
        this.logger.error(
          'ERROR PROCESSING PAYMENT, NO WINNINGS WERE SENT, TXID:',
          txid,
        );
      }
    } catch (error) {
      this.logger.error('an unexpected error occured', error);
      //if any errors occcur during payout we log to database
      try {
        await this.prisma.games.update({
          where: {
            signature: job?.data?.txid,
          },
          data: {
            player: job?.data?.reciever,
            outcome: true,
            processed: false,
          },
        });
        this.logger.error(
          'ERROR PROCESSING WIN RESULTS, USER PAYOUT WAS TAKEN, TXID:',
          job?.data?.txid,
        );
      } catch (error) {
        return false;
      }
      return false;
    }
  }
}
