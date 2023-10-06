import { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
//@ts-ignore
import { toPublicKey } from "@metaplex-foundation/js";

export default function GetBalance() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);

  async function subscribeToUser() {
    connection.onAccountChange(
      toPublicKey(wallet?.publicKey?.toString()!),
      (updatedAccountInfo: any, context: any) =>
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL),
      "confirmed"
    );
  }

  async function fetchBalance() {
    const balance = await connection.getBalance(wallet.publicKey!);
    setBalance(balance / LAMPORTS_PER_SOL);
  }

  useEffect(() => {
    if (wallet.connected) {
      fetchBalance();
      subscribeToUser();
    }
  }, [wallet, connection]);

  return balance;
}
