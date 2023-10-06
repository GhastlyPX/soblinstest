import Image from 'next/image'
import Link from 'next/link'
import logo from '../app/assets/logo.png'

export default function Recent() {
    return (
        <div className='fixed top-4 lg:top-8 left-4 lg:left-8 flex flex-col gap-2 items-end z-20'>
            <Link href="/">
                <Image src={logo} alt={"Soblin Logo"} className='w-[48px] lg:w-[68px]'/>
            </Link>
        </div>
    )
  }