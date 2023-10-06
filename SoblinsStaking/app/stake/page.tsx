import StakeMenu from '@/components/staking/stakeMenu';

export default function Page() {
  return (
    <div className={'flex flex-col animate-fade-in'}>
      <div className={'flex flex-col pb-10'}>
        <h1
          className={
            'text-4xl md:text-6xl xl:text-8xl font-bold text-soblinText-2'
          }
        >
          Stake your Soblins
        </h1>
        <h2
          className={
            'text-base md:text-xl xl:text-2xl font-medium text-soblinText-1'
          }
        >
          Earn rewards by proving your loyalty
        </h2>
      </div>
      <StakeMenu />
    </div>
  );
}
