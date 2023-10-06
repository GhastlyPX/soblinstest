import Image from 'next/image'
import map  from '../app/assets/map.gif'

export default function Warning() {
  return (
    <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-center bg-no-repeat bg-cover flex items-center z-20 p-2 lg:p-8 flex justify-center items-center'>
      <div className='w-[100vw] min-h-[100vh] fixed top-0 left-0 backdrop-blur'></div>
      <div className='w-[100vw] min-h-[100vh] fixed top-0 left-0 bg-[#19211150]'></div>
      <div className='z-30 p-2 lg:p-4 w-max border-[5px] border-[#312E2F] m-auto rounded-2xl bg-secondary-100 flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center'>
            <p className='text-[#48262D] text-[20px] font-bold text-center'>Soblins is not playable on this browser size.</p>
            <p className='text-[#925F6B] text-[14px] font-light text-center'>(Due to the aspect ratio of the map)</p>
        </div>
        <p className='text-[#48262D] text-[16px] font-normal text-center'>Please either increase browser height, or decrease browser width.</p>
      </div>
    </div>
  )
}
