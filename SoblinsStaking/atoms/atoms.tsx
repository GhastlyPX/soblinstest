import { PublicKey } from '@solana/web3.js';
import { atom } from 'jotai';

export const selectedAtom = atom<string[]>([]);
