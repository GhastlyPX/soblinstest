import Image from "next/image";
import map from "../app/assets/map.gif";
import { useState } from "react";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import GetBalance from "./hooks/getBalance";

export default function Bet(props: any) {
  const [bet, setBet] = useState(0);
  const balance = GetBalance();
  const maintenance = false;

  function raid(bet: number) {
    if (maintenance) {
      return;
    }
    props.exampleRaid(props.currentHut, bet);
    props.setIsDropdownActive(false);
  }

  let multiplier = 0;

  switch (props.currentHut.name) {
    case "Fort Soblin":
      multiplier = 4;
      break;
    case "Mineshaft":
      multiplier = 10;
      break;
    case "Temple":
      multiplier = 20;
      break;
    case "Barnyard":
      multiplier = 1.3;
      break;
    case "Blacksmith":
      multiplier = 2;
      break;
    default:
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-center bg-no-repeat bg-cover fixed flex items-center justify-center z-20 p-2 lg:p-8 overflow-y-auto">
      <div className="w-[100vw] min-h-[100vh] fixed top-0 left-0 backdrop-blur"></div>
      <div
        className="w-[100vw] min-h-[100vh] fixed top-0 left-0 bg-[#19211150]"
        onClick={(e) => {
          // @ts-ignore
          if (
            (e.target as Element).className ===
            "w-[100vw] min-h-[100vh] fixed top-0 left-0 bg-[#19211150]"
          ) {
            props.setIsDropdownActive(false);
          }
        }}
      ></div>
      <div className="z-30 w-full lg:w-[80%] h-[700px] lg:h-[850px] border-[5px] border-[#312E2F] m-auto rounded-2xl bg-secondary-100 mt-16 lg:mt-24">
        {props.currentHut.name === "Fort Soblin" && (
          <div
            className="h-[175px] lg:h-[275px] bg-[30%] rounded-t-lg bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${map.src})`,
              backgroundPositionX: `50%`,
              backgroundPositionY: `8.5%`,
            }}
          ></div>
        )}
        {props.currentHut.name === "Mineshaft" && (
          <div
            className="h-[175px] lg:h-[275px] bg-[30%] rounded-t-lg bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${map.src})`,
              backgroundPositionX: `50%`,
              backgroundPositionY: `47.5%`,
            }}
          ></div>
        )}
        {props.currentHut.name === "Temple" && (
          <div
            className="h-[175px] lg:h-[275px] bg-[30%] rounded-t-lg bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${map.src})`,
              backgroundPositionX: `100%`,
              backgroundPositionY: `30%`,
            }}
          ></div>
        )}
        {props.currentHut.name === "Barnyard" && (
          <div
            className="h-[175px] lg:h-[275px] bg-[30%] rounded-t-lg bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${map.src})`,
              backgroundPositionX: `100%`,
              backgroundPositionY: `80%`,
            }}
          ></div>
        )}
        {props.currentHut.name === "Blacksmith" && (
          <div
            className="h-[175px] lg:h-[275px] bg-[30%] rounded-t-lg bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${map.src})`,
              backgroundPositionX: `0%`,
              backgroundPositionY: `74%`,
            }}
          ></div>
        )}
        <div className="h-[515px] lg:h-[565px] px-3 lg:px-12 py-5 lg:py-20 flex flex-col gap-6 lg:gap-12 justify-between relative">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[#48262D] text-[20px] lg:text-[40px] font-bold">
                {props.currentHut.name}
              </p>
              <p className="text-[#925F6B] text-[12px] lg:text-[24px]">
                Success rate: {props.currentHut.successRate}%
              </p>
            </div>
            <button
              className="bg-primary-100 hover:bg-primary-50 py-3 px-6 relative min-w-[80px] lg:min-w-[155px] flex justify-center rounded-xl transition-all"
              disabled={!bet || maintenance}
              onClick={() => raid(bet)}
            >
              RAID
            </button>
          </div>
          <div className="flex flex-col lg:flex-row h-full">
            <div className="bg-[#8D1933] rounded-t-2xl lg:rounded-none lg:rounded-l-2xl p-4 lg:p-8 relative flex justify-center items-center">
              <div className="h-[100px] lg:h-[200px] w-[100px] lg:w-[200px] bg-primary-50 rounded-full flex flex-col items-center justify-center gap-2 relative z-10">
                <svg
                  width="48"
                  height="51"
                  viewBox="0 0 48 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[25px] lg:h-[50px]"
                >
                  <path
                    d="M24.17 50.4638C37.331 50.4638 48.0002 39.7947 48.0002 26.6336C48.0002 13.4726 37.331 2.80347 24.17 2.80347C11.009 2.80347 0.339844 13.4726 0.339844 26.6336C0.339844 39.7947 11.009 50.4638 24.17 50.4638Z"
                    fill="#F4900C"
                  />
                  <path
                    d="M24.17 47.6603C37.331 47.6603 48.0002 36.9912 48.0002 23.8302C48.0002 10.6691 37.331 0 24.17 0C11.009 0 0.339844 10.6691 0.339844 23.8302C0.339844 36.9912 11.009 47.6603 24.17 47.6603Z"
                    fill="#FFCC4D"
                  />
                  <path
                    d="M24.1698 44.8568C35.0083 44.8568 43.7946 36.0705 43.7946 25.232C43.7946 14.3935 35.0083 5.60718 24.1698 5.60718C13.3313 5.60718 4.54492 14.3935 4.54492 25.232C4.54492 36.0705 13.3313 44.8568 24.1698 44.8568Z"
                    fill="#FFE8B6"
                  />
                  <path
                    d="M24.1698 43.455C35.0083 43.455 43.7946 34.6687 43.7946 23.8302C43.7946 12.9917 35.0083 4.20532 24.1698 4.20532C13.3313 4.20532 4.54492 12.9917 4.54492 23.8302C4.54492 34.6687 13.3313 43.455 24.1698 43.455Z"
                    fill="#FFAC33"
                  />
                  <path
                    d="M12.3149 15.2178C12.3149 14.4538 13.0649 14.1482 13.0649 14.1482L24.1081 8.96167L35.2564 14.1482C35.2564 14.1482 36.0245 14.3192 36.0245 15.2234V16.1219H12.3149V15.2178Z"
                    fill="#FFE8B6"
                  />
                  <path
                    d="M35.2846 17.9931C35.2846 17.1745 34.5767 16.5115 33.7048 16.5115H14.5384C13.6651 16.5115 13.0567 17.1745 13.0567 17.9931C13.0567 18.5497 13.3427 19.0291 13.7982 19.2828V20.2164H16.7616V19.4748H19.7249V20.2164H22.6883V19.4748H25.6516V20.2164H28.615V19.4748H31.5783V20.2164H34.5431V19.2449C34.9875 18.9814 35.2846 18.5202 35.2846 17.9931ZM37.5064 33.6426C37.5064 34.2565 37.0088 34.7542 36.3948 34.7542H11.9451C11.3311 34.7542 10.8335 34.2565 10.8335 33.6426C10.8335 33.0286 11.3311 32.5309 11.9451 32.5309H36.3962C37.0088 32.5309 37.5064 33.0286 37.5064 33.6426Z"
                    fill="#F4900C"
                  />
                  <path
                    d="M36.025 17.1014C36.025 17.5107 35.6942 17.8429 35.2834 17.8429H13.0555C12.6462 17.8429 12.314 17.5107 12.314 17.1014C12.314 16.6921 12.6462 16.3599 13.0555 16.3599L35.2834 16.3641C35.6942 16.3655 36.025 16.6921 36.025 17.1014ZM16.0203 17.9621H32.3215V19.6246H16.0203V17.9621Z"
                    fill="#F4900C"
                  />
                  <path
                    d="M16.7602 29.1977C16.7602 30.0163 16.3172 30.6793 15.7719 30.6793H14.7837C14.2384 30.6793 13.7954 30.0163 13.7954 29.1977V17.9639C13.7954 17.1452 14.2384 16.4822 14.7837 16.4822H15.7719C16.3172 16.4822 16.7602 17.1452 16.7602 17.9639V29.1977ZM34.5431 29.1977C34.5431 30.0163 34.1015 30.6793 33.5548 30.6793H32.5666C32.0213 30.6793 31.5783 30.0163 31.5783 29.1977V17.9639C31.5783 17.1452 32.0199 16.4822 32.5666 16.4822H33.5548C34.1001 16.4822 34.5431 17.1452 34.5431 17.9639V29.1977ZM22.6883 29.1977C22.6883 30.0163 22.2453 30.6793 21.7 30.6793H20.7118C20.1665 30.6793 19.7235 30.0163 19.7235 29.1977V17.9639C19.7235 17.1452 20.1665 16.4822 20.7118 16.4822H21.7C22.2453 16.4822 22.6883 17.1452 22.6883 17.9639V29.1977ZM28.615 29.1977C28.615 30.0163 28.172 30.6793 27.6267 30.6793H26.6399C26.0946 30.6793 25.6516 30.0163 25.6516 29.1977V17.9639C25.6516 17.1452 26.0946 16.4822 26.6399 16.4822H27.6267C28.172 16.4822 28.615 17.1452 28.615 17.9639V29.1977Z"
                    fill="#FFD983"
                  />
                  <path
                    d="M35.2846 29.9377C35.2846 30.7564 34.6215 31.4194 33.8029 31.4194H14.5383C13.7197 31.4194 13.0566 30.7564 13.0566 29.9377C13.0566 29.1191 13.7197 28.4561 14.5383 28.4561H33.8029C34.6201 28.4561 35.2846 29.1191 35.2846 29.9377Z"
                    fill="#FFCC4D"
                  />
                  <path
                    d="M36.7669 31.4192C36.7669 32.2378 36.1039 32.9009 35.2852 32.9009H13.0559C12.2373 32.9009 11.5742 32.2378 11.5742 31.4192C11.5742 30.6005 12.2373 29.9375 13.0559 29.9375H35.2838C36.1025 29.9375 36.7669 30.6005 36.7669 31.4192Z"
                    fill="#FFD983"
                  />
                  <path
                    d="M37.5064 32.531C37.5064 33.145 37.0088 33.6426 36.3948 33.6426H11.9451C11.3311 33.6426 10.8335 33.145 10.8335 32.531C10.8335 31.9171 11.3311 31.4194 11.9451 31.4194H36.3962C37.0088 31.4194 37.5064 31.9171 37.5064 32.531Z"
                    fill="#FFD983"
                  />
                  <path
                    d="M35.2846 17.2222C35.2846 16.4035 34.5767 15.7405 33.7048 15.7405H14.5383C13.665 15.7405 13.0566 16.4035 13.0566 17.2222C13.0566 17.7787 13.3426 18.2581 13.7982 18.5118V19.4454H16.7615V18.7038H19.7249V19.4454H22.6882V18.7038H25.6516V19.4454H28.6149V18.7038H31.5783V19.4454H34.543V18.4739C34.9874 18.2104 35.2846 17.7492 35.2846 17.2222Z"
                    fill="#FFCC4D"
                  />
                  <path
                    d="M12.3149 16.0684C12.3149 15.3044 13.0649 14.9988 13.0649 14.9988L24.1081 9.81226L35.2564 14.9988C35.2564 14.9988 36.0245 15.1698 36.0245 16.074V16.4819H12.3149V16.0684Z"
                    fill="#FFD983"
                  />
                  <path
                    d="M24.1704 11.6948C24.1704 11.6948 16.5237 15.2988 15.7612 15.624C14.9972 15.9478 15.2523 16.4805 15.7626 16.4805H32.5418C33.3296 16.4805 33.1432 15.8791 32.518 15.5539C31.8928 15.2301 24.1704 11.6948 24.1704 11.6948Z"
                    fill="#FFAC33"
                  />
                  <path
                    d="M36.025 16.4808C36.025 16.8901 35.6942 17.2223 35.2834 17.2223H13.0555C12.6462 17.2223 12.314 16.8901 12.314 16.4808C12.314 16.0715 12.6462 15.7393 13.0555 15.7393L35.2834 15.7435C35.6942 15.7449 36.025 16.0715 36.025 16.4808Z"
                    fill="#FFD983"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <p className="text-[#F1DBDD] text-[10px] lg:text-[14px] font-light">
                    Reward
                  </p>
                  <p className="text-secondaryText-100 text-[12px] lg:text-[20px] font-bold">
                    {((bet / LAMPORTS_PER_SOL) * multiplier).toFixed(3) +
                      " SOL"}
                  </p>
                </div>
              </div>
              {props.currentHut.name === "Fort Soblin" && (
                <div
                  className="absolute h-[105px] lg:h-[210px] w-[105px] lg:w-[210px] rounded-full top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] -z-1"
                  style={{
                    background: "conic-gradient(#BD1A3F 25%, #7A1129 25%)",
                  }}
                ></div>
              )}
              {props.currentHut.name === "Temple" && (
                <div
                  className="absolute h-[105px] lg:h-[210px] w-[105px] lg:w-[210px] rounded-full top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] -z-1"
                  style={{
                    background: "conic-gradient(#BD1A3F 5%, #7A1129 5%)",
                  }}
                ></div>
              )}
              {props.currentHut.name === "Mineshaft" && (
                <div
                  className="absolute h-[105px] lg:h-[210px] w-[105px] lg:w-[210px] rounded-full top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] -z-1"
                  style={{
                    background: "conic-gradient(#BD1A3F 10%, #7A1129 10%)",
                  }}
                ></div>
              )}
              {props.currentHut.name === "Blacksmith" && (
                <div
                  className="absolute h-[105px] lg:h-[210px] w-[105px] lg:w-[210px] rounded-full top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] -z-1"
                  style={{
                    background: "conic-gradient(#BD1A3F 50%, #7A1129 50%)",
                  }}
                ></div>
              )}
              {props.currentHut.name === "Barnyard" && (
                <div
                  className="absolute h-[105px] lg:h-[210px] w-[105px] lg:w-[210px] rounded-full top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] -z-1"
                  style={{
                    background: "conic-gradient(#BD1A3F 75%, #7A1129 75%)",
                  }}
                ></div>
              )}
            </div>
            <div className="bg-primary-50 w-full rounded-b-2xl lg:rounded-none lg:rounded-r-2xl p-4 lg:p-8 flex flex-col justify-between">
              <div>
                <p className="text-[#F1DBDD] text-[12px] lg:text-[14px] font-light">
                  Balance: {balance.toFixed(2) + " SOL"}
                </p>
                <p className="text-secondaryText-100 text-[20px] lg:text-[32px] font-bold">
                  SOLANA BET
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 2xl:w-[80%]">
                <div
                  className={`${
                    bet / LAMPORTS_PER_SOL === 0.05 && "bg-secondary-50"
                  } bg-secondary-100 hover:bg-secondary-50 transition-all py-2 px-4 relative min-w-[100px] flex justify-center rounded-lg text-primary-100 font-bold cursor-pointer text-[14px] xl:text-[16px]`}
                  onClick={() => setBet(0.05 * LAMPORTS_PER_SOL)}
                >
                  0.05 SOL
                </div>
                <div
                  className={`${
                    bet / LAMPORTS_PER_SOL === 0.1 && "bg-secondary-50"
                  } bg-secondary-100 hover:bg-secondary-50 transition-all py-2 px-4 relative min-w-[100px] flex justify-center rounded-lg text-primary-100 font-bold cursor-pointer text-[14px] xl:text-[16px]`}
                  onClick={() => setBet(0.1 * LAMPORTS_PER_SOL)}
                >
                  0.1 SOL
                </div>
                <div
                  className={`${
                    bet / LAMPORTS_PER_SOL === 0.25 && "bg-secondary-50"
                  } bg-secondary-100 hover:bg-secondary-50 transition-all py-2 px-4 relative min-w-[100px] flex justify-center rounded-lg text-primary-100 font-bold cursor-pointer text-[14px] xl:text-[16px]`}
                  onClick={() => setBet(0.25 * LAMPORTS_PER_SOL)}
                >
                  0.25 SOL
                </div>
                {props.currentHut.name !== "Temple" &&
                <div
                  className={`${
                    bet / LAMPORTS_PER_SOL === 0.5 && "bg-secondary-50"
                  } bg-secondary-100 hover:bg-secondary-50 transition-all py-2 px-4 relative min-w-[100px] flex justify-center rounded-lg text-primary-100 font-bold cursor-pointer text-[14px] xl:text-[16px]`}
                  onClick={() => setBet(0.5 * LAMPORTS_PER_SOL)}
                >
                  0.5 SOL
                </div>
                }
                {/* <div
                  className={`${
                    bet / LAMPORTS_PER_SOL === 1 && "bg-secondary-50"
                  } bg-secondary-100 hover:bg-secondary-50 transition-all py-2 px-4 relative min-w-[100px] flex justify-center rounded-lg text-primary-100 font-bold cursor-pointer text-[14px] xl:text-[16px]`}
                  onClick={() => setBet(1 * LAMPORTS_PER_SOL)}
                >
                  1 SOL
                </div>
                <div
                  className={`${
                    bet / LAMPORTS_PER_SOL === 2 && "bg-secondary-50"
                  } bg-secondary-100 hover:bg-secondary-50 transition-all py-2 px-4 relative min-w-[100px] flex justify-center rounded-lg text-primary-100 font-bold cursor-pointer text-[14px] xl:text-[16px]`}
                  onClick={() => setBet(2 * LAMPORTS_PER_SOL)}
                >
                  2 SOL
                </div> */}
              </div>
            </div>
          </div>
          <div className="bg-[#BFC4CA] h-[11px] w-full absolute bottom-0 left-0 rounded-b-md -z-100"></div>
        </div>
      </div>
      <div
        onClick={() => props.setIsDropdownActive(false)}
        className=" hover:bg-primary-50 transition-all z-10 absolute top-4 lg:top-8 right-4 lg:right-8 bg-primary-100 p-3 border-[2px] flex justify-center items-center cursor-pointer"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[16px] lg:w-[28px] h-[16px] lg:h-[28px]"
        >
          <path
            d="M2.63184 25.6001L14.1159 14.1161M14.1159 14.1161L25.5999 2.63208M14.1159 14.1161L2.63184 2.63208M14.1159 14.1161L25.5999 25.6001"
            stroke="#F5F7FB"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
