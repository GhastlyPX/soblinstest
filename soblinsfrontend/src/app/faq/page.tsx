import Image from 'next/image'
import map from '../assets/map.gif'
import Navigation from '@/components/navigation'
import Icon from '@/components/icon'

export default function Home() {
  return (
    <div className='w-[100vw] min-h-[100vh] bg-center bg-no-repeat bg-cover relative flex items-center p-4 lg:p-8' style={{backgroundImage: "url(" + map.src + ")"}}>
        <Icon />
        <Navigation />
        <div className='z-10 max-w-[850px] flex flex-col gap-6 items-start'>
            <p className='text-secondaryText-100 text-[40px] md:text-[56px] lg:text-[72px] xl:text-[80px] 2xl:text-[104px] font-bold'>FAQ</p>
            <p className='text-secondaryText-50 text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[28px] font-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
        <div className='w-[100vw] min-h-[100vh] fixed top-0 left-0 backdrop-blur'></div>
        <div className='w-[100vw] min-h-[100vh] fixed top-0 left-0 bg-[#19211150]'></div>
    </div>
  )
}
