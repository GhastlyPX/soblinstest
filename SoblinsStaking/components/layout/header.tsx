'use client';
import Image from 'next/image';
import Discord from '@/public/svgs/Discord.svg';
import Twitter from '@/public/svgs/Twitter.svg';
import { WalletMultiButton } from '../wallet';
import Link from 'next/link';
import Hamburger from '@/public/svgs/Hamburger.svg';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react';
import { getAllUsers } from '@/program/scripts';
import { useEffect, useState } from 'react';
import SpinnerSmall from './spinnerSmall';

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [staked, setStaked] = useState<number>()

  async function getStaked(){
    const allStaked = await getAllUsers()
    const filterStaked = allStaked?.data?.filter((i) => i.stakeCnt > 0 )
    let count = 0
    for (let i = 0; i < filterStaked?.length!; i++ ){
      if (filterStaked){
        count += filterStaked[i]?.stakeCnt
      }
    }
    setStaked(count)
  }
  useEffect(
    () => {
      getStaked();
      const timer = window.setInterval(() => {
        getStaked();
      }, 10000);
    
      return () => { 
        window.clearInterval(timer);
      }
    },
    []
  );

  return (
    <div className={'flex flex-row w-full justify-between pb-10 items-center relative '}>
      <Link href={'/'}>
        <Image src={'/branding/logo.png'} alt={'logo'} width={68} height={68} />
      </Link>
      <div
        
        className={
          'flex items-center absolute lg:hidden left-1/2 transform -translate-x-1/2 items-center justify-center bg-soblinRed-1 rounded-[10px] h-[45px] w-[150px] sm:w-[190px] text-soblinRed-3 text-xs sm:text-base font-bold'
        }
      >
        Encamped: {staked ? staked : <SpinnerSmall/>}/777
      </div>
      <button
        className={'flex lg:hidden h-[40px] w-[40px] text-soblinRed-4'}
        onClick={onOpen}
      >
        <Hamburger width={40} height={40} />
      </button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          className={'flex flex-col items-center gap-4 bg-soblinRed-2 pt-10'}
        >
          <div className={'h-[40px]'}>
            <WalletMultiButton />
          </div>
          <Link
            href={'/'}
            className={
              'flex items-center justify-center bg-soblinRed-1 rounded-[10px] h-[40px]  w-[148px] text-soblinRed-3 text-base font-bold'
            }
          >
            Learn more
          </Link>
          <Link
            href={'/stake'}
            className={
              'flex items-center justify-center bg-soblinRed-1 rounded-[10px] h-[40px]  w-[148px] text-soblinRed-3 text-base font-bold'
            }
          >
            Stake now
          </Link>

          <Link
            href={'https://discord.gg/soblins'}
            target={'_blank'}
            rel={'noopener noreferer'}
            className={
              'flex items-center justify-center bg-soblinRed-1 rounded-[10px] h-[40px]  w-[148px] text-soblinRed-3 text-base font-bold'
            }
          >
            <Discord />
          </Link>
          <Link
            href={'https://twitter.com/soblins_'}
            target={'_blank'}
            rel={'noopener noreferer'}
            className={
              'flex items-center justify-center bg-soblinRed-1 rounded-[10px] h-[40px]  w-[148px] text-soblinRed-3 text-base font-bold'
            }
          >
            <Twitter />
          </Link>
        </DrawerContent>
      </Drawer>
      <div className={'hidden lg:flex flex-row gap-4 h-[45px]'}>
      <div
        
        className={
          'flex items-center justify-center bg-soblinRed-1 rounded-[10px] h-full w-[100px] sm:w-[190px] text-soblinRed-3 text-xs sm:text-base font-bold'
        }
      >
        Encamped: {staked ? staked : <SpinnerSmall/>}/777
      </div>
        <Link
        href={'https://discord.gg/soblins'}
        target={'_blank'}
        rel={'noopener noreferer'}
          className={
            'flex items-center justify-center bg-soblinRed-1 h-full w-[60px] rounded-[10px]'
          }
        >
          <Discord />
        </Link>
        <Link
        href={'https://twitter.com/soblins_'}
        target={'_blank'}
        rel={'noopener noreferer'}
          className={
            'flex items-center justify-center bg-soblinRed-1 h-full w-[60px] rounded-[10px]'
          }
        >
          <Twitter />
        </Link>
        <Link
          href={'/'}
          className={
            'flex items-center justify-center bg-soblinRed-1 rounded-[10px] h-full w-[148px] text-soblinRed-3 text-base font-bold'
          }
        >
          Learn more
        </Link>

        <WalletMultiButton />
      </div>
    </div>
  );
}
