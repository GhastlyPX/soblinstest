import { PublicKey } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { IDL } from './IDL';
import { RPC_URL } from '@/constants/constants';

export const GLOBAL_AUTHORITY_SEED = 'global-authority';
export const USER_POOL_SEED = 'user-stake-pool';

export const USER_POOL_SIZE = 2045;

export const PROGRAM_ID = new PublicKey(
  'sobfSTcyd86t5TRYDdX2MZmRfGeeDG1P1otR5wG3GZh'
);
let wallet;
let program: any;

if (typeof window !== 'undefined') {
  let cloneWindow: any = window;
  wallet = cloneWindow;
  const connection = new anchor.web3.Connection(RPC_URL, 'confirmed');
  const providerInit = new anchor.AnchorProvider(
    connection,
    wallet['solana'],
    anchor.AnchorProvider.defaultOptions()
  );

  program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, providerInit);
}

export { program };

export const MILSECS_IN_DAY = 1000 * 60 * 60 * 24;
//  export const MILSECS_IN_DAY = (1000 * 60);
