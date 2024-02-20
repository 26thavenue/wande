import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
const WhyChooseUs = () => {
  return (
    <div className="my-20  text-center">
      <Container>
        <h3 className="mb-12 text-3xl font-bold uppercase ">Why Choose Us</h3>
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 items-center gap-8" >
          <div className='bg-[#f6f6f6] rounded-md '>
            <Image  alt='Delivery' src='/Delivery.svg'  width={500} height={500} className='p-3' />
        </div>
         <div className='flex flex-col gap-4 items-start justify-start'>
             <h3 className='text-2xl uppercase font-semibold'>Fast and relaible delivery</h3>
             <p className='text-xs text-[#9f9e9e] '> Expect our delivery to come in the stipulated time with no item missing leaving you happy</p>
          </div>
          <div className='bg-[#f6f6f6] rounded-md '>
            <Image  alt='Delivery' src='/Delivery.svg'  width={500} height={500} className='p-3' />
        </div>
         <div className='flex flex-col gap-4 items-start justify-start'>
             <h3 className='text-2xl uppercase font-semibold'>Fast and relaible delivery</h3>
             <p className='text-xs text-[#9f9e9e] '> Expect our delivery to come in the stipulated time with no item missing leaving you happy</p>
          </div>
          <div className='bg-[#f6f6f6] rounded-md '>
            <Image  alt='Delivery' src='/Delivery.svg'  width={500} height={500} className='p-3' />
        </div>
         <div className='flex flex-col gap-4 items-start justify-start'>
             <h3 className='text-2xl uppercase font-semibold'>Fast and relaible delivery</h3>
             <p className='text-xs text-[#9f9e9e] '> Expect our delivery to come in the stipulated time with no item missing leaving you happy</p>
          </div>
        </div>
       
        
      </Container>
        
        
    </div>
  )
}

export default WhyChooseUs