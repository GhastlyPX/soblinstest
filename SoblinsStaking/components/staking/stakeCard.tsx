'use client';
import Image from 'next/image';
import Clock from '@/public/svgs/Clock.svg';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedAtom } from '@/atoms/atoms';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getUserPoolState } from '@/program/scripts';
import { Tooltip } from '@chakra-ui/react';

export default function StakeCard({ nft, mode }: any) {
  const selectedNFTs = useAtomValue(selectedAtom);
  const setSelectedNFTs = useSetAtom(selectedAtom);
  const [daysDifference, setDaysDifference] = useState<number>(0);
  const wallet = useWallet();

  async function fetchUserStatus() {
    if (mode === 'home') {
      return;
    }
    const getUserPool = await getUserPoolState(wallet?.publicKey!);
    const date = new Date(Date.now());
    const filteredPool = getUserPool?.stakeData?.filter(
      (i: any) => i.mint.toString() === nft?.mint?.address.toString()
    );
    //@ts-ignore
    if (!filteredPool) {
      return;
    }
    const nftDate = new Date(filteredPool[0]?.time?.toNumber() * 1000);
    const timeDifference: number = date?.getTime() - nftDate?.getTime();
    const daysDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    if (daysDifference >= 0 && daysDifference <= 77){
    setDaysDifference(daysDifference);
    } 
    else if (daysDifference > 77){
      setDaysDifference(100)
    }
    else {
      setDaysDifference(0)
    }
  }

  useEffect(() => {
    fetchUserStatus();
  }, [wallet?.publicKey]);

  const selectNFT = (nft: string) => {
    if(selectedNFTs.length === 3){
      const newSelected = selectedNFTs.filter((i: any) => i !== nft);
      setSelectedNFTs(newSelected);
      return
    }
    if (selectedNFTs.indexOf(nft) === -1) {
      setSelectedNFTs((prevState: any) => [...prevState, nft]);
    } else {
      const newSelected = selectedNFTs.filter((i: any) => i !== nft);
      setSelectedNFTs(newSelected);
    }
  };

  let totalDays = 0;

  if (daysDifference < 7 ){
    totalDays=7
  }
  if (daysDifference >= 7 && daysDifference <= 14  ){
    totalDays=14
  }

  if (daysDifference >= 14 && daysDifference <= 21  ){
    totalDays=21
  }

  if (daysDifference >= 21 && daysDifference < 77  ){
    totalDays=77
  }
  if (daysDifference > 77){
    totalDays=100
  }


const percentageFilled = (daysDifference / totalDays) * 100;

// Calculate the circumference of circle 1
const circumference = 2 * Math.PI * 50;
// Calculate the dash array value for circle 2
const strokeDasharrayValue = (circumference * percentageFilled) / 100;

// Calculate the dash offset value for circle 2
const strokeDashoffsetValue = circumference - strokeDasharrayValue;

  return (
    <div
      className={
        'flex flex-row container 2xl:w-full 2xl:max-w-[600px] max-w-[538px] h-[250px] xs:h-[308px] bg-soblinRed-4 rounded-[20px] text-soblinRed-1'
      }
    >
      <div
        className={
          'flex flex-col justify-between max-w-[219px] bg-soblinRed-5 h-full w-full p-3 xs:pt-7 xs:pb-5 xs:px-6 rounded-tl-[20px] rounded-bl-[20px]'
        }
      >
        <div
          className={
            'flex flex-col gap-2 items-center justify-center text-center'
          }
        >
          <div
            className={
              'relative container h-[100px] w-[100px] xs:w-[145px] xs:h-[145px]'
            }
          >
            {mode === 'staking' || mode === 'unstaked' ? (
              <Image
                src={nft?.json?.image}
                alt={'stakedNFT'}
                fill={true}
                className={'rounded-full'}
              />
            ) : (
              <Image
                src={'/test.png'}
                alt={'stakedNFT'}
                fill={true}
                className={'rounded-full'}
              />
            )}
          </div>

          <div>
            <h3 className={'text-base xs:text-2xl font-bold'}>
              {mode === 'staking' || mode === 'unstaked'
                ? nft?.name
                : 'Soblin #777'}
            </h3>
            <div className={'flex flex-row items-center gap-1'}>
              <div className={'hidden xs:flex'}>
                <Clock />
              </div>

              <p className={'text-xs xs:text-sm font-medium'}>
                {mode !== "unstaked" && daysDifference < 0 ? "Encamped for 0 days" : !daysDifference && mode !== "unstaked" ? "Encamped for 0 days" : mode === 'staking'
                  ? `Encamped for ${daysDifference} days`
                  : mode === 'unstaked'
                  ? 'Stake to earn rewards'
                  : 'Encamped for 40 days'}
              </p>
            </div>
          </div>
        </div>
        <Tooltip hasArrow
            label="max of 3 nfts per transaction"
            placement="top"
            bg="#FAEDED"
            className={
              `${selectedNFTs.length === 3 ? "visible" : "hidden"} text-soblinRed-3 font-bold bg-soblinRed-1 p-2 text-base rounded-lg`
            }>
        <button
          className={`${
            selectedNFTs?.indexOf(nft?.mint?.address?.toString()) !== -1
              ? 'bg-soblinRed-3 text-soblinRed-1'
              : 'bg-soblinRed-1  text-soblinRed-4'
          }  rounded-md font-bold text-xs h-[27px]`}
          onClick={() => {
            selectNFT(nft?.address?.toString());
          }}
        >
          {selectedNFTs?.indexOf(nft?.mint?.address?.toString()) !== -1
            ? 'Selected'
            : 'Select'}
        </button>
        </Tooltip>
      </div>
      <div
        className={
          'flex flex-1 flex-col items-center text-center p-3 xs:pt-7 xs:pb-5'
        }
      >
        <div>
          <h5 className={'text-sm xs:text-xl'}>Current tier:</h5>
          <h4 className={'text-xl xs:text-[32px] font-bold'}>
            {daysDifference >= 0 && daysDifference < 7
              ? 'Basic hut'
              : daysDifference >= 7 && daysDifference < 14
              ? 'Bronze hut'
              : daysDifference >= 14 && daysDifference < 21
              ? 'Silver hut'
              : daysDifference >= 21 && daysDifference < 77
              ? 'Gold hut'
              : daysDifference >= 77
              ? 'Diamond hut'
              : !daysDifference && 'Basic hut'}
          </h4>
        </div>
        <div className={'flex relative w-[145px] h-[145px] mt-4'}>
          <svg viewBox="0 0 100 100" className={'overflow-visible'}>
            <g>
              <circle
                className="rewards"
                cx="50"
                cy="50"
                r="50"
                fill="transparent"
                stroke="#BD1A3F"
                strokeWidth="4"
                strokeDasharray={`100 0`}
                strokeDashoffset={'0'}
                key={'rewards base'}
              ></circle>
            </g>
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="transparent"
              stroke="#7A1129"
              strokeDasharray={`${strokeDasharrayValue} ${strokeDashoffsetValue}`}
              transform={`rotate(270)`}
              transform-origin={'50 50'}
              strokeWidth="4"
            ></circle>
          </svg>
          <div
            className={
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap'
            }
          >
            <div className={'flex flex-col items-center gap-4'}>
            {daysDifference >= 0 && daysDifference < 7
                    ? <Image src={"/ranks/basicLarge.png"} width={50} height={50} alt={"hut"}/>
                    : daysDifference >= 7 && daysDifference < 14
                    ? <Image src={"/ranks/bronzeLarge.png"} width={50} height={50} alt={"hut"}/>
                    : daysDifference >= 14 && daysDifference < 21
                    ? <Image src={"/ranks/silverLarge.png"} width={50} height={50} alt={"hut"}/>
                    : daysDifference >= 21 && daysDifference < 77
                    ? <Image src={"/ranks/goldLarge.png"} width={50} height={50} alt={"hut"}/>
                    : daysDifference >= 77
                    ? <Image src={"/ranks/diamondLarge.png"} width={50} height={50} alt={"hut"}/>
                    : <Image src={"/ranks/basicLarge.png"} width={50} height={50} alt={"hut"}/>}
              <div>
                <h6 className={'text-[10px]'}>Next tier:</h6>
                <h5 className={'text-sm font-bold'}>
                  {daysDifference >= 0 && daysDifference < 7
                    ? 'Bronze hut'
                    : daysDifference >= 7 && daysDifference < 14
                    ? 'Silver hut'
                    : daysDifference >= 14 && daysDifference < 21
                    ? 'Gold hut'
                    : daysDifference >= 21 && daysDifference < 77
                    ? 'Diamond hut'
                    : daysDifference >= 77
                    ? 'Max rank'
                    : 'Bronze hut'}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
