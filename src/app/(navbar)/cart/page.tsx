'use client'

import Container from '@/components/Container'
import CartClient from '@/components/cart-client'
import React,{useEffect} from 'react'
import { useCartStore } from '@/lib/cart';

const page = () => {
  useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);
  return (
    <div className='pt-8'>
      <Container>
        <CartClient/>
      </Container>
        
    </div>
  )
}

export default page