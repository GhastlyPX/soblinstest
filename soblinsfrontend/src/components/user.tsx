import Image from "next/image";
import profile from "../app/assets/profile.png";
import GetBalance from "./hooks/getBalance";
import { useWallet } from "@solana/wallet-adapter-react";

export default function User() {
  const balance = GetBalance();
  const wallet = useWallet();

  const userData = {
    image: profile,
    name: wallet.connected
      ? wallet?.publicKey?.toBase58().slice(0, 6) + "..."
      : "",
    balance: wallet.connected ? balance.toFixed(2) + " SOL" : "",
  };

  return (
    <div className="fixed w-max top-16 lg:top-8 right-4 lg:left-8 flex flex-col gap-2 lg:gap-4 z-20">
      <div className="flex flex-row-reverse lg:flex-row gap-2 lg:gap-4">
        <div className="flex flex-col gap-[20px] bg-primary-100 py-1 lg:py-2 px-1 lg:px-2 border-[2px] relative justify-center">
          <Image
            src={userData.image}
            width={84}
            height={84}
            alt={"Profile Image"}
            className="w-[64px] lg:w-[84px] h-[64px] lg:h-[84px]"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[10px] lg:min-h-[44px] lg:gap-[20px] bg-primary-100 py-1 lg:py-2 px-3 lg:px-6 border-[2px] relative h-full min-w-[100px] lg:min-w-[155px] justify-center items-center text-[12px] lg:text-[16px]">
            {userData.name}
          </div>
          <div className="flex flex-col gap-[10px] lg:min-h-[44px] lg:gap-[20px] bg-primary-100 py-1 lg:py-2 px-3 lg:px-6 border-[2px] relative h-full min-w-[100px] lg:min-w-[155px] justify-center items-center text-[12px] lg:text-[16px]">
            {userData.balance}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[20px] bg-primary-100 py-2 lg:py-1 px-3 lg:px-6 border-[2px] relative lg:min-w-[155px] justify-center items-center text-[12px] lg:text-[16px]">
        SOBLINS
      </div>
    </div>
  );
}
