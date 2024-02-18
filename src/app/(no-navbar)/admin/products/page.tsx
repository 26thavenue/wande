
import React from 'react'
import Container  from '@/components/Container'
import { ProductType } from '@/lib/types'
import {useEffect, useState }from 'react'
import {ProductTable} from '@/components/productTable'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AddProductButton from '@/components/addProductButton'


export default async function Page (){
  
  return (
    <Container>
      <h1 className='font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2  mt-3'>Products</h1>
      <h4 className='text-xs text-[#b6b6b6] mb-6'> Manage your store's product</h4>
      <div className='flex gap-8 justify-between '>
         <Input placeholder='Search for products' className='w-1/4 mb-6 justify-self-start'/>
          <AddProductButton/>
      </div>  
        <ProductTable/>
      
    </Container>
  )
}



