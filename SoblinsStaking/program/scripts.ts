import {
  PublicKey,
  Keypair,
  Connection,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  Transaction
} from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PROGRAM_ID as TOKEN_AUTH_RULES_ID } from '@metaplex-foundation/mpl-token-auth-rules';

import {
  METAPLEX,
  MPL_DEFAULT_RULE_SET,
  findTokenRecordPda,
  getAssociatedTokenAccount,
  getMasterEdition,
  getMetadata
} from './utils';
import { USER_POOL_SEED, program, USER_POOL_SIZE } from './constant';
import { AnchorProvider } from '@project-serum/anchor';
import { UserPool } from './types';
import { ENCAMPENT_URL, RPC_URL } from '@/constants/constants';

export const createInitUserTx = async (userAddress: PublicKey) => {
  const [userPool, bump] = PublicKey.findProgramAddressSync(
    [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
    program.programId
  );

  const txId = await program.methods
    .initUser()
    .accounts({
      user: userAddress,
      userPool,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY
    })
    .transaction();

  return txId;
};

export const createLockPnftTx = async (
  userAddress: PublicKey,
  publicKeys: string[],
  connection: Connection,
  provider: AnchorProvider
) => {
  let nftMint: PublicKey[] = []
  
  for (const i in publicKeys){
    nftMint.push(new PublicKey(publicKeys[i]))
  }
  const [userPool, _user_bump] = PublicKey.findProgramAddressSync(
    [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
    program.programId
  );
  const tx = new Transaction();

  let poolAccount = await connection.getAccountInfo(userPool);
  if (poolAccount === null || poolAccount.data === null) {
    const tx_initUserPool = await createInitUserTx(userAddress);
    tx.add(tx_initUserPool);
  }

  for (const i in nftMint){
  const nftEdition = await getMasterEdition(nftMint[i]);

  let tokenAccount = await getAssociatedTokenAccount(userAddress, nftMint[i]);

  const mintMetadata = await getMetadata(nftMint[i]);

  const tokenMintRecord = findTokenRecordPda(nftMint[i], tokenAccount);

  const txId = await program.methods
    .lockPnft()
    .accounts({
      tokenAccount,
      tokenMint: nftMint[i],
      tokenMintEdition: nftEdition,
      tokenMintRecord,
      mintMetadata,
      authRules: MPL_DEFAULT_RULE_SET,
      sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
      signer: userAddress,
      userPool,
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenMetadataProgram: METAPLEX,
      authRulesProgram: TOKEN_AUTH_RULES_ID,
      systemProgram: SystemProgram.programId
    })
    .transaction();

  tx.add(txId);
  }

  console.log(tx)

  const finalised = await provider.sendAndConfirm(tx, [], {commitment:"finalized"});

  return finalised;
};

export const createUnlockPnftTx = async (
  userAddress: PublicKey,
  publicKeys: string[],
  provider: AnchorProvider
) => {
  let nftMint: PublicKey[] = []
  console.log(nftMint)
  for (const i in publicKeys){
    nftMint.push(new PublicKey(publicKeys[i]))
  }
  const [userPool, _user_bump] = PublicKey.findProgramAddressSync(
    [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
    program.programId
  );

  const tx = new Transaction();

  for (const i in nftMint){
  const nftEdition = await getMasterEdition(nftMint[i]);

  let tokenAccount = await getAssociatedTokenAccount(userAddress, nftMint[i]);

  const mintMetadata = await getMetadata(nftMint[i]);

  const tokenMintRecord = findTokenRecordPda(nftMint[i], tokenAccount);

  const txId = await program.methods
    .unlockPnft()
    .accounts({
      tokenAccount,
      tokenMint: nftMint[i],
      tokenMintEdition: nftEdition,
      tokenMintRecord,
      mintMetadata,
      authRules: MPL_DEFAULT_RULE_SET,
      sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
      signer: userAddress,
      userPool,
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenMetadataProgram: METAPLEX,
      authRulesProgram: TOKEN_AUTH_RULES_ID,
      systemProgram: SystemProgram.programId
    })
    .transaction();
    tx.add(txId);
  
  }

  const txid = await provider.sendAndConfirm(tx, [], {commitment:"finalized"});

  return txid;
};

export const getUserPoolState = async (
  userAddress: PublicKey
): Promise<UserPool | null> => {
  if (!userAddress) return null;

  const [userPoolKey, bump] = PublicKey.findProgramAddressSync(
    [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
    program.programId
  );

  try {
    let poolState = await program.account.userPool.fetch(
      userPoolKey,
      'finalized'
    );
    return poolState as unknown as UserPool;
  } catch {
    return null;
  }
};

export const getAllUsers = async () => {
  const connection = new Connection(ENCAMPENT_URL)
  let userPools = await connection.getProgramAccounts(
    program.programId,
      {
          filters: [{
              dataSize: USER_POOL_SIZE,
          }],
      }
  );

  let result: UserPool[] = [];

  try {
      for (let idx = 0; idx < userPools.length; idx++) {
          const data = userPools[idx].account.data;
          const user = new PublicKey(data.slice(8, 40));
          const stakeCnt = data[40];

          let stakeData = [];
          for (let i = 0; i < stakeCnt; i++) {
              const mint = new PublicKey(data.slice(i * 40 + 45, i * 40 + 77));

              const buf = data.slice(i * 40 + 77, i * 40 + 85).reverse();
              const time = new anchor.BN(buf);

              stakeData.push({
                  mint,
                  time,
              });
          }

          result.push({
              user,
              stakeCnt,
              stakeData,
          });
      }
  } catch (e) {
      console.log(e);
      return {};
  }

  return {
      count: result.length,
      data: result.map((usrPool: UserPool) => {
          return {
              user: usrPool.user.toBase58(),
              stakeCnt: usrPool.stakeCnt,
              stakeData: usrPool.stakeData.map((data) => {
                  return {
                      mint: data.mint.toBase58(),
                      time: new Date(data.time.toNumber() * 1000).toLocaleString()
                  };
              }),
          };
      }),
  };
}
