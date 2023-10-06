"use client";
import Link from "next/link";
import { WalletMultiButton } from "./wallet";
import GetBalance from "./hooks/getBalance";
import useMute from "./hooks/setMute";
import { useAtomValue, useSetAtom } from "jotai";
import { muteAtom } from "../../atoms/atoms";

export default function Navigation() {
  const balance = GetBalance();
  const { updateMode } = useMute();
  const mute = useAtomValue(muteAtom);
  const setMute = useSetAtom(muteAtom);

  function handleMode() {
    if (mute === "false") {
      updateMode("true");
    } else if (mute === "true") {
      updateMode("false");
    }
  }

  return (
    <div className="fixed top-4 lg:top-8 right-4 lg:right-8 flex gap-2 z-20">
      <div
        onClick={() => handleMode()}
        className="bg-primary-100 hover:bg-primary-50 transition-all py-2 lg:py-2 px-3 lg:px-6 border-[2px] relative min-w-[35px] lg:min-w-[65px] flex justify-center items-center cursor-pointer text-[12px] lg:text-[16px]"
      >
        {mute === "false" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        )}
        <div className="bg-primary-50 h-[4px] w-full absolute bottom-0 left-0"></div>
      </div>
      <Link
        href={"https://discord.gg/soblins"}
        target="_blank"
        rel="noreferrer noopener"
        className="bg-primary-100 hover:bg-primary-50 transition-all py-2 lg:py-2 px-3 lg:px-6 border-[2px] relative min-w-[35px] lg:min-w-[65px] hidden sm:flex justify-center items-center cursor-pointer text-[12px] lg:text-[16px]"
      >
        <svg
          width="20"
          height="15"
          viewBox="0 0 20 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.04335 1.25244C0.784605 4.48414 -0.330893 8.1294 0.0861073 12.3259C0.0878582 12.3437 0.0973587 12.36 0.112358 12.3707C1.82285 13.5929 3.4801 14.3347 5.1141 14.8266C5.12682 14.8303 5.14044 14.8301 5.15303 14.826C5.16563 14.8218 5.17658 14.814 5.18435 14.8035C5.56185 14.2923 5.90485 13.7535 6.20535 13.1876C6.2226 13.1543 6.20685 13.1142 6.17135 13.101C5.6266 12.9013 5.1086 12.6619 4.61035 12.3785C4.5711 12.3561 4.5686 12.3014 4.60485 12.2751C4.7106 12.1987 4.81535 12.1184 4.9156 12.0381C4.93435 12.0233 4.9596 12.0204 4.98085 12.0304C8.21559 13.4839 11.7591 13.4839 15.0321 12.0304C15.0533 12.0211 15.0786 12.0243 15.0968 12.0389C15.1968 12.1192 15.3018 12.1987 15.4066 12.2751C15.4428 12.3014 15.4398 12.3561 15.4003 12.3785C14.9021 12.6565 14.3841 12.9013 13.8401 13.102C13.8048 13.1151 13.7881 13.1543 13.8056 13.1876C14.0996 13.7542 14.4426 14.2931 14.8271 14.8042C14.8438 14.8249 14.8713 14.8344 14.8973 14.8266C16.5236 14.3347 18.1808 13.5929 19.8913 12.3707C19.9056 12.36 19.9158 12.343 19.9173 12.3252C20.2658 8.69527 19.5556 5.01983 16.9628 1.25171C16.9566 1.24174 16.9471 1.23395 16.9361 1.22933C15.6603 0.659577 14.2936 0.24041 12.8651 0.00102554C12.8391 -0.0028669 12.8131 0.00881041 12.7996 0.0311919C12.6231 0.335288 12.4213 0.725262 12.2848 1.04395C10.7791 0.82014 9.24984 0.82014 7.71259 1.04395C7.57609 0.732074 7.38135 0.335288 7.2056 0.0311919C7.19934 0.0200887 7.18963 0.0111934 7.17787 0.00577596C7.16611 0.000358522 7.15289 -0.00130407 7.1401 0.00102554C5.71085 0.24114 4.3441 0.660307 3.06935 1.22933C3.0581 1.23395 3.04885 1.24174 3.04335 1.25244ZM11.5193 8.15422C11.5036 7.08112 12.3076 6.19316 13.3168 6.19316C14.3178 6.19316 15.1141 7.07334 15.1141 8.15422C15.1141 9.23486 14.3021 10.115 13.3168 10.115C12.3156 10.115 11.5193 9.23486 11.5193 8.15422ZM4.87385 8.15422C4.8581 7.08112 5.6621 6.19316 6.6711 6.19316C7.67235 6.19316 8.46859 7.07334 8.46859 8.15422C8.46859 9.23486 7.6566 10.115 6.6711 10.115C5.6621 10.115 4.87385 9.23486 4.87385 8.15422Z"
            fill="#F5F7FB"
          />
        </svg>
        <div className="bg-primary-50 h-[4px] w-full absolute bottom-0 left-0"></div>
      </Link>
      <Link
        href={"https://twitter.com/Soblins_"}
        target="_blank"
        rel="noreferrer noopener"
        className="bg-primary-100 hover:bg-primary-50 transition-all py-2 lg:py-2 px-3 lg:px-6 border-[2px] relative min-w-[35px] lg:min-w-[65px] hidden sm:flex justify-center items-center cursor-pointer text-[12px] lg:text-[16px]"
      >
        <svg
          width="20"
          height="17"
          viewBox="0 0 20 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 1.92961C19.2642 2.25797 18.4718 2.47688 17.643 2.57822C18.492 2.06744 19.1389 1.26074 19.4461 0.304036C18.6537 0.770224 17.7764 1.1148 16.8425 1.29722C16.0946 0.498619 15.0273 0 13.8468 0C11.5787 0 9.74328 1.84043 9.74328 4.11462C9.74328 4.43892 9.77966 4.75107 9.84839 5.05105C6.44027 4.88079 3.41621 3.24305 1.39074 0.754009C1.03901 1.36208 0.836871 2.06744 0.836871 2.82145C0.836871 4.24839 1.56054 5.50913 2.6602 6.24692C1.98908 6.22665 1.35436 6.04018 0.800485 5.73209C0.800485 5.7483 0.800485 5.76452 0.800485 5.78479C0.800485 7.77926 2.21548 9.44132 4.09137 9.81833C3.74773 9.91157 3.38387 9.96426 3.01193 9.96426C2.74914 9.96426 2.4904 9.93994 2.23974 9.8913C2.76127 11.525 4.27734 12.7168 6.07237 12.7492C4.6695 13.8519 2.89873 14.5086 0.978371 14.5086C0.646857 14.5086 0.319385 14.4883 0 14.4518C1.81524 15.6193 3.97413 16.3004 6.29068 16.3004C13.8387 16.3004 17.9664 10.0332 17.9664 4.59297C17.9664 4.4146 17.9624 4.23623 17.9543 4.06192C18.7548 3.47817 19.4502 2.75254 20 1.92961Z"
            fill="#F5F7FB"
          />
        </svg>
        <div className="bg-primary-50 h-[4px] w-full absolute bottom-0 left-0"></div>
      </Link>
      <Link href="/guide" className="hidden xs:block">
        <div className="bg-primary-100 hover:bg-primary-50 transition-all py-2 lg:py-2 px-3 lg:px-6 border-[2px] relative min-w-[50px] lg:min-w-[155px] hidden xs:flex justify-center cursor-pointer text-[12px] lg:text-[16px] h-full">
          <p>LEARN MORE</p>
          <div className="bg-primary-50 h-[4px] w-full absolute bottom-0 left-0"></div>
        </div>
      </Link>
      <button className="bg-primary-100 hover:bg-primary-50 transition-all py-2 lg:py-2 px-3 lg:px-6 border-[2px] relative min-w-[50px] lg:min-w-[155px] flex justify-center cursor-pointer text-[12px] lg:text-[16px]">
        <p>{balance.toFixed(2)} SOL</p>
        <div className="bg-primary-50 h-[4px] w-full absolute bottom-0 left-0"></div>
      </button>
      <WalletMultiButton />
    </div>
  );
}
