import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  Res,
} from '@nestjs/common';
import { Queue } from 'bull';
import * as anchor from '@project-serum/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';
import { Orao } from '@orao-network/solana-vrf';
import { PrismaService } from 'src/prisma.service';
import { HOUSE_WALLET, MINIMUM_BALANCE } from 'constants/constants';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { web3 } from '@project-serum/anchor';
import { randomBytes } from 'crypto';
import { base64 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { SolanaParser } from '@debridge-finance/solana-transaction-parser';

@Injectable()
export class PlayService {
  private readonly logger = new Logger(PlayService.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue('games') private readonly gamesQueue: Queue,
    private config: ConfigService,
  ) {}
  /**
   * Plays a game and returns whether the user wins or loses.
   * @param tx The unsigned transaction from frontend.
   * @param hut The hut that the user wants to play.
   * @returns Win or lose.
   */
  async playGame({
    transaction,
    location,
  }: {
    transaction: string;
    location: string;
  }) {
    const tx = transaction;
    const transactionBuffer = base64.decode(transaction);
    const instructions = Transaction.from(transactionBuffer).instructions;
    try {
      //perform inital tx checks to see whether or not the transaction is the correct amount and whether it's going to the house wallet
      let connection = new Connection(
        this.config.get<string>('ANCHOR_PROVIDER_URL')!,
        {
          commitment: 'finalized',
        },
      );

      const balance = await connection.getBalance(new PublicKey(HOUSE_WALLET));

      if (balance / LAMPORTS_PER_SOL < MINIMUM_BALANCE) {
        return {
          status: 400,
          response: {
            name: 'HouseWalletEmpty',
            message: 'The house wallet is empty',
          },
        };
      }

      // Initialize a variable to track the total Sol amount
      const transferInstructions: any = [];

      instructions.forEach((instruction) => {
        const programId = instruction.programId.toString();

        // Check if the instruction is a SystemProgram.transfer
        if (programId === SystemProgram.programId.toString()) {
          const transferData = instruction.data;

          // Extract the lamports value from the instruction data
          const lamports = transferData.readBigUInt64LE(4);

          // Convert lamports to SOL (assuming 1 SOL = 10^9 lamports)
          const solAmount = Number(lamports) / LAMPORTS_PER_SOL;

          // Access the public keys of the accounts involved
          const fromPubkey = instruction.keys[0].pubkey.toString();
          const toPubkey = instruction.keys[1].pubkey.toString();

          // Add transfer information to the array
          transferInstructions.push({
            from: fromPubkey,
            to: toPubkey,
            solAmount: solAmount,
          });
        }
      });

      let bet = null;

      //determine inital bet amount
      switch (true) {
        case transferInstructions[0].solAmount >= 0.05 &&
          transferInstructions[0].solAmount < 0.1:
          bet = 0.05;
          break;
        case transferInstructions[0].solAmount >= 0.1 &&
          transferInstructions[0].solAmount < 0.25:
          bet = 0.1;
          break;
        case transferInstructions[0].solAmount >= 0.25 &&
          transferInstructions[0].solAmount < 0.5:
          bet = 0.25;
          break;
        case transferInstructions[0].solAmount >= 0.5 &&
          transferInstructions[0].solAmount < 1:
          bet = 0.5;
          break;
        // case transferInstructions[0].solAmount >= 1 &&
        //   transferInstructions[0].solAmount < 2:
        //   bet = 1;
        //   break;
        // case transferInstructions[0].solAmount >= 2:
        //   bet = 2;
        //   break;
        default:
      }

      let successRate = null;
      //determine hut values
      switch (location) {
        case 'Fort Soblin':
          successRate = 22;
          break;
        case 'Mineshaft':
          successRate = 8;
          break;
        case 'Temple':
          successRate = 3;
          break;
        case 'Barnyard':
          successRate = 71;
          break;
        case 'Blacksmith':
          successRate = 47;
          break;
        default:
      }

      let multiplier = 0;

      switch (location) {
        case 'Fort Soblin':
          multiplier = 4;
          break;
        case 'Mineshaft':
          multiplier = 10;
          break;
        case 'Temple':
          multiplier = 20;
          break;
        case 'Barnyard':
          multiplier = 1.3;
          break;
        case 'Blacksmith':
          multiplier = 2;
          break;
        default:
      }

      if (multiplier === 0) {
        return {
          status: 400,
          response: {
            name: 'InvalidMultiplier',
            message: 'No multiplier found for this location',
          },
        };
      }

      if (bet === null) {
        return {
          status: 400,
          response: {
            name: 'InvalidBet',
            message: 'No bet was placed',
          },
        };
      }

      if (balance / LAMPORTS_PER_SOL - bet * multiplier <= MINIMUM_BALANCE) {
        return {
          status: 400,
          response: {
            name: 'InsufficientHouseFunds',
            message:
              'The house does not have enough funds to cover this payout',
          },
        };
      }

      if (transferInstructions[0].to !== HOUSE_WALLET) {
        return {
          status: 400,
          response: {
            name: 'IncorrectReciever',
            message: 'The transaction has the wrong reciever',
          },
        };
      }

      if (transferInstructions[0].from === HOUSE_WALLET) {
        return {
          status: 400,
          response: {
            name: 'IncorrectSender',
            message: 'The transaction has the wrong sender',
          },
        };
      }

      //send the transaction to mainnet
      const processTransaction = await connection.sendEncodedTransaction(tx, {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });

      if (!processTransaction) {
        return {
          status: 400,
          response: {
            name: 'FailedToSend',
            message: 'Failed to send the transaction',
          },
        };
      }

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: processTransaction,
        },
        'confirmed',
      );

      let txdetails = null;

      while (txdetails === null) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const txResponse = await connection.getParsedTransaction(
          processTransaction,
          'confirmed',
        );

        if (txResponse !== null) {
          txdetails = txResponse;
        }
      }

      if (txdetails.meta?.err) {
        return {
          status: 400,
          response: {
            name: 'FailedToProcess',
            message: 'Failed to process the transaction',
          },
        };
      }

      const transaction = await this.prisma.games.findUnique({
        where: {
          signature: processTransaction,
        },
      });

      function generateRandomNumber(): number {
        const range = 100 - 0 + 1;
        const buffer = randomBytes(4); // 4 bytes for a 32-bit integer
        const randomNumber = buffer.readUInt32LE(0);

        // Scale the random number to the desired range
        const scaledRandomNumber = 0 + (randomNumber % range);

        return scaledRandomNumber;
      }

      if (transaction) {
        return {
          status: 400,
          response: {
            name: 'TransactionExists',
            message: 'This transaction has already been processed',
          },
        };
      }

      if (!processTransaction) {
        return {
          status: 400,
          response: {
            name: 'NoTransaction',
            message: 'No transaction to process',
          },
        };
      }

      if (!successRate) {
        return {
          status: 400,
          response: {
            name: 'InvalidHut',
            message: 'Invalid hut',
          },
        };
      }

      const winOrLose = generateRandomNumber();

      //add percentage of winning per hut
      if (
        !transaction &&
        processTransaction &&
        bet &&
        multiplier &&
        winOrLose <= successRate
      ) {
        try {
          await this.prisma.games.create({
            data: {
              signature: processTransaction,
              player: transferInstructions[0].from,
              outcome: true,
              processed: false,
              hut: location,
              winAmount: parseInt(
                (bet * multiplier * LAMPORTS_PER_SOL).toFixed(0),
              ),
              initialBet: bet * LAMPORTS_PER_SOL,
            },
          });
          await this.gamesQueue.add(
            'processWin',
            {
              txid: processTransaction,
              reciever: transferInstructions[0].from,
              bet: bet * LAMPORTS_PER_SOL,
              hut: location,
              solToPayout: parseInt(
                (bet * multiplier * LAMPORTS_PER_SOL).toFixed(0),
              ),
            },
            {
              jobId: transferInstructions[0].from + tx.slice(0, 10),
              removeOnComplete: true,
              attempts: 1,
              removeOnFail: true,
            },
          );
          return {
            status: 200,
            response: {
              message: `You defeated ${location} and won ${
                bet * multiplier
              } SOL!`,
            },
          };
        } catch (error) {
          this.logger.error(
            'ERROR ADDING INITIAL WIN TO DATABASE, PAYMENT WAS TAKEN, TXID:',
            processTransaction,
          );
          return {
            status: 400,
            response: {
              name: 'ErrorProcessingWinResults',
              message:
                'Unable to process win results, payment was taken, txid' +
                processTransaction,
            },
          };
        }
      } else {
        try {
          await this.prisma.games.create({
            data: {
              signature: processTransaction,
              player: transferInstructions[0].from,
              outcome: false,
              processed: true,
              hut: location,
              winAmount: 0,
              initialBet: bet * LAMPORTS_PER_SOL,
            },
          });
          return {
            status: 200,
            response: {
              message: `You were defeated by ${location} and lost ${bet} SOL!`,
            },
          };
        } catch (error) {
          return {
            status: 400,
            response: { name: 'unknown', message: error },
          };
        }
      }
    } catch (error) {
      this.logger.log(error);
      return {
        status: 400,
        response: { name: 'unknown', message: error },
      };
    }
  }
}
