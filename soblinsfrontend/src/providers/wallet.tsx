"use client";
import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  BackpackWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { CLUSTER_NETWORK, RPC_URL } from "@/constants/constants";
import { WalletModalProvider } from "@/components/wallet";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const network = CLUSTER_NETWORK;

const Wallet = ({ children }: { children: React.ReactNode }) => {
  const roulette = [
    "https://prettiest-palpable-bridge.solana-mainnet.quiknode.pro/3d4d47ed3bb6b8892fd60ab58ab3947c7f390da2/",
    "https://billowing-quick-choice.solana-mainnet.quiknode.pro/f5d7188f5b2ff516227568d3d2eff9cbe0b6d228/",
  ];
  const winner = roulette[Math.floor(Math.random() * roulette.length)];
  const endpoint = useMemo(() => winner, [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new BackpackWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider
      endpoint={endpoint}
      config={{ commitment: "confirmed" }}
    >
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Wallet;
