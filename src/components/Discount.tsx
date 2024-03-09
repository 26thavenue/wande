import React from 'react'
import Container from '@/components/Container'
import Image from 'next/image'
const Discount = () => {
  return (
    <>
    <p className='mt-24 text-center font-bold text-2xl mb-6'> EXPLORE DIFFERENT DISCOUNT  OPTIONS</p>
     <div className=' lg:h-[30%]  xl:h-[30%] md:h-[35%] h-[40%]  grid lg:grid-cols-3 xl:grid-cols-3 w-full bg-red-100    mb-16  text-white'>
      
       <div className='bg-[#67C2F5] p-16 w-[100%] h-full  flex justify-center item-center'>
         
          <Image src='/Socket-bg-remove.png' alt='banner' width={700} height={700} className=' ' />
           <p className='text-xs font-thin h-12 rounded-md bg-white p-2 text-black '> 35% OFF</p>
       </div>
       <div className='bg-[#EBB582] p-16 w-[100%]  h-full flex justify-center item-center'>
          <Image src='/Socket-bg-remove.png' alt='banner' width={700} height={700} className='' />
           <p className='text-xs font-thin h-12 rounded-md bg-white p-2 text-black '> 15% OFF</p>

       </div>
       <div className='bg-[#EC9380] p-16 w-[100%]  h-full flex justify-center item-center'>
          <Image src='/Socket-bg-remove.png' alt='banner' width={300} height={300} className=' ' />
           <p className='text-xs font-thin h-12 rounded-md bg-white p-2 text-black '> 20% OFF</p>

       </div>
    </div>
    </>
    
   
  )
}

export default Discount