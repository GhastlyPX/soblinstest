'use client';
import React, { FC, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import {
  BackpackWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { CLUSTER_NETWORK, RPC_URL } from '@/constants/constants';
import { WalletModalProvider } from '@/components/wallet';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const network = CLUSTER_NETWORK;

const Wallet = ({ children }: { children: React.ReactNode }) => {

  const roulette = ["https://radial-dimensional-energy.solana-mainnet.quiknode.pro/60b028228b84a4617abdaa528c883112059ff742/", "https://little-responsive-theorem.solana-mainnet.quiknode.pro/f1301c1941f02c259009b41dcdad6cb909e76e94/"]
  const winner = roulette[Math.floor(Math.random() * roulette.length)];
  const endpoint = useMemo(() => winner, [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new BackpackWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter()
    ],
    [network]
  );

  return (
    <ConnectionProvider
      endpoint={endpoint}
      config={{ commitment: 'confirmed' }}
    >
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          {children}
          {/* Your app's components go here, nested within the context providers. */}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Wallet;
