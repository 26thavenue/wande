'use client'

import Container from '@/components/Container'

import React from 'react'




const Page = () => {
  
  return (
    <Container>
      <div className='flex  flex-col   gap-3'>
        <h1 className='text-2xl font-bold mt-5'>Order Received</h1>
        <p className='text-sm mt-1 font-[#b6b6b6]'>Your order has been received </p>
        <div className="flex xl:flex-row lg:flex-row md:flex-row gap-2 ">           
          <p className="bg-[#f6f6f6] p-6 w-56 text-sm ">ORDER ID -  0000</p>    
          <p className="bg-[#f6f6f6] p-6 w-56 text-sm">TOTAL - 0000 </p>    
          <p className="bg-[#f6f6f6] p-6 w-56 text-sm">PAYMENT METHOD - DIRECT BANK TRANSFER</p>    
            
        </div>
        
        <div className='mt-4 flex flex-col gap-3 '>
           <h1 className='font-bold text-2xl'>BANK DETAILS</h1>

           <div className="flex  gap-2 ">
              <p className="text-sm bg-slate-50 p-6 w-56">Bank: GTB</p>
              <p className="text-sm bg-slate-50 p-6 w-56">Account Name: 0000</p>
              <p className="text-sm bg-slate-50 p-6 w-56">Account Number: 0000</p>
            </div>

           <div className="flex  gap-2">
              <p className="text-sm bg-slate-50 p-6 w-56">Bank: Access Bank</p>
              <p className="text-sm bg-slate-50 p-6 w-56">Account Name: 0000</p>
              <p className="text-sm bg-slate-50 p-6 w-56">Account Number: 0000</p>
            </div>
        </div>

        <div className="mt-5">
          <h1><h1 className='font-bold text-2xl'>ORDER DETAILS</h1></h1>
        </div>
        
       

      </div>
    </Container>
    
  )
}

export default Page