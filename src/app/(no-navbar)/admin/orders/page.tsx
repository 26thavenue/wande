import React from 'react'
import Container from '@/components/Container'
import { Input } from '@/components/ui/input'
import OrderTable from '@/components/orderTable'
const page = () => {
  return (
    <div>
      <Container>
        <h1 className='font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2  mt-3'>Payments</h1>
        <h4 className='text-xs text-[#b6b6b6] mb-6'> Manage your store's payments</h4>

        
         <Input placeholder='Search for orders' className='w-1/4 mb-6 justify-self-start'/>
           
        <OrderTable/>
      </Container>
    </div>
  )
}

export default page