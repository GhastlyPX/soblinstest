import RewardsCard from '@/components/layout/rewardsCard';
import StakeCard from '@/components/staking/stakeCard';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={'flex flex-col flex-1 animate-fade-in gap-10 md:gap-0'}>
      <section
        className={
          'flex w-full h-auto md:h-[calc(100vh-148px)] md:items-center'
        }
      >
        <div
          className={
            'flex flex-col 2xl:flex-row w-full 2xl:justify-between gap-10 2xl:items-center'
          }
        >
          <div
            className={'flex flex-col container h-fit max-w-[1000px] gap-10 '}
          >
            <div className={'flex flex-col gap-5'}>
              <h1
                className={
                  'font-bold text-4xl md:text-6xl xl:text-8xl text-soblinText-2'
                }
              >
                Encampment system
              </h1>
              <p
                className={
                  'text-base md:text-xl xl:text-2xl text-soblinText-1 w-[95%] font-medium'
                }
              >
                The staking system for Soblins will work in a unique way that
                offers bigger rewards to the most loyal holders we have. To
                reach and progress to higher tier huts, you have to
                consecutively stake for a certain amount of days in a row. If
                you unstake, you will be reset to 0 days staking when restaking.
              </p>
            </div>
            <div className={'flex flex-row gap-4 text-soblinRed-1'}>
              <Link
                href={'/stake'}
                className={
                  'flex items-center justify-center font-bold h-[45px] bg-soblinRed-3 rounded-[10px] w-[148px]'
                }
              >
                Stake now
              </Link>
            </div>
          </div>
          <StakeCard mode={'home'} />
        </div>
      </section>
      <section
        className={
          'flex flex-col w-full min-h-screen justify-center gap-10 md:gap-24'
        }
      >
        <div className={'flex flex-col gap-5 text-center'}>
          <h2
            className={
              'font-bold text-4xl md:text-6xl xl:text-8xl text-soblinText-2'
            }
          >
            Hut Rewards
          </h2>
          <p
            className={
              'text-soblinText-1 font-medium text-base md:text-xl xl:text-2xl'
            }
          >
            Every hut streak provides a unique variety of perks.
          </p>
        </div>
        <div
          className={
            'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'
          }
        >
          <RewardsCard reward={'none'} />
          <RewardsCard reward={'bronze'} />
          <RewardsCard reward={'silver'} />
          <RewardsCard reward={'gold'} />
          <RewardsCard reward={'diamond'} />
        </div>
      </section>
    </div>
  );
}
