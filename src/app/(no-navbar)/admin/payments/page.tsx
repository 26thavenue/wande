import React from 'react'
import Container from '@/components/Container'
import { Input } from '@/components/ui/input'
import PaymentTable from '@/components/paymentTable'
const Page = () => {
  return (
    <div>
      <Container>
        <h1 className='font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2  mt-3'>Payments</h1>
        <h4 className='text-xs text-[#b6b6b6] mb-6'> Manage your store&apos;spayments</h4>
           
        <PaymentTable/>
      </Container>
    </div>
  )
}

export default Page