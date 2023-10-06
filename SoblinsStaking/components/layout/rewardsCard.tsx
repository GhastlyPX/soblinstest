'use client';
import Image from 'next/image';
import Bronze from '@/public/ranks/bronze.svg';
import Diamond from '@/public/ranks/diamond.svg';
import Gold from '@/public/ranks/gold.svg';
import Silver from '@/public/ranks/silver.svg';

interface Props {
  reward: string;
}

export default function RewardsCard({ reward }: Props) {
  return (
    <div
      className={
        'flex flex-col p-6 px-10  w-full 2xl:max-w-[379px] h-[550px] justify-between bg-soblinRed-4 rounded-[10px] items-center text-center text-soblinRed-1'
      }
    >
      {reward === 'none' ? (
        <Image
          src={'/ranks/basicLarge.png'}
          alt={'bronze'}
          height={128}
          width={128}
        />
      ) : reward === 'bronze' ? (
        <Image
          src={'/ranks/bronzeLarge.png'}
          alt={'bronze'}
          height={128}
          width={128}
        />
      ) : reward === 'silver' ? (
        <Image
          src={'/ranks/silverLarge.png'}
          alt={'bronze'}
          height={128}
          width={128}
        />
      ) : reward === 'gold' ? (
        <Image
          src={'/ranks/goldLarge.png'}
          alt={'bronze'}
          height={128}
          width={128}
        />
      ) : (
        <Image
          src={'/ranks/diamondLarge.png'}
          alt={'bronze'}
          height={128}
          width={128}
        />
      )}
      <div className={'flex flex-col text-sm 3xl:text-base gap-6 h-[304px]'}>
        <div className={'flex flex-col'}>
          <h2 className={'font-bold text-4xl'}>
            {reward === 'none'
              ? 'Base '
              : reward === 'bronze'
              ? 'Bronze '
              : reward === 'silver'
              ? 'Silver '
              : reward === 'gold'
              ? 'Gold '
              : 'Diamond '}
            hut
          </h2>
          <p className={'font-medium'}>
            Unlocks after{' '}
            {reward === "none" ? '0' : reward === 'bronze'
              ? '7'
              : reward === 'silver'
              ? '14'
              : reward === 'gold'
              ? '21'
              : '77'}{' '}
            days
          </p>
        </div>
        <ul className="list-disc text-left">
          {reward === 'none' ? (
            <li>
              No access to any of the benefits we provide outside of holders
              chat access and the role(s) in our discord server for holding.
            </li>
          ) : reward === 'bronze' ? (
            <li>
              A small % of revenue share will be airdropped to stakers in the
              bronze tier.
            </li>
          ) : reward === 'silver' ? (
            <li>
              A bigger % of revenue share will be airdropped to stakers in the
              silver tier.
            </li>
          ) : reward === 'gold' ? (
            <ul className={'list-disc'}>
              <li>
                An even bigger % of revenue share will be airdropped to stakers
                in the gold tier.
              </li>
              <li>
                More benefits added as time goes on (plans set in stone, but not
                acted upon just yet).
              </li>
            </ul>
          ) : (
            <ul className={'list-disc'}>
              <li>All of the benefits from Gold.
            </li>
            <li>
            Your Soblin will be implemented into
              HH as an NPC character, with a nod to you being its holder when it
              was implemented.
            </li>
            <li>
            ???
            </li>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
}
