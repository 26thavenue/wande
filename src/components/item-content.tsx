'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useCartStore } from "@/lib/cart";

type CartProductType = {
    id:number,
    name:string,
    price:number,
    quantity:number
    imageUrl:string

}
interface ItemContentProps{
    item:CartProductType
}

const ItemContent:React.FC<ItemContentProps> = ({item}) => {
  const{remove:handleRemoveFromCart} = useCartStore()
  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4  py-4 items-center'>
        <div className='col-span-2 justify-self-start items-center '>
            <div className='flex gap-2 md:gap-4 items-center'>
                <Link href={`/product/${item.id}`}>
                    <Image src={item.imageUrl} width={180} height={180} alt='product'/>
                </Link>
                <div className="flex flex-col  justify-center">
                <p className='mb-6'>{item.name}</p>
                <button
                 onClick={() => handleRemoveFromCart(item.id)}
                 className='text-slate-500  underline transistion '>Remove</button>
                </div>
                
            </div>
            
            
            
        </div>
        <div className='justify-self-center'>{item.price}</div>
        <div className='justify-self-center'>{item.quantity}</div>
        <div className='justify-self-end'>{item.price * item.quantity}</div>
    </div>
  )
}

export default ItemContent 