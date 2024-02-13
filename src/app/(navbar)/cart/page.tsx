

import Container from '@/components/Container'
import CartClient from '@/components/cart-client'
import React from 'react'


const page = () => {
  return (
    <div className='pt-8'>
      <Container>
        <CartClient/>
      </Container>
        
    </div>
  )
}

export default page