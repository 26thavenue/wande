'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useCartStore } from "@/lib/cart";
import QuantityButton from './quantity-button';
import {parseImageUrl,truncateText} from '@/lib/utils'
type CartProductType = {
    id:string,
    name:string,
    price:number,
    count:number
    imageUrl:string

}

interface ItemContentProps{
    item:CartProductType
}

const ItemContent:React.FC<ItemContentProps> = ({item}) => {
  const{remove:handleRemoveFromCart} = useCartStore()
  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4  py-4 items-center'>
        <div className='col-span-2 justify-self-start  items-center '>
            <div className='flex gap-2   md:gap-4 justify-center  items-center'>
                <Link href={`/products/${item.id}`}>
                    <Image src={parseImageUrl(item.imageUrl)} width={100} height={100} alt='product' className='object-cover'/>
                </Link>
                 <div className="flex flex-col  justify-center">
                    <p className='ml-2'>{truncateText(item.name)}</p>
                    {/* <button
                 onClick={() => handleRemoveFromCart(item.id)}
                 className='text-slate-500  underline transistion '>Remove</button> */}
                </div>
                 
             </div>
            
             
            
        </div>
        <div className='justify-self-center'>{item.price}</div>
        <div className='justify-self-center'>{item.count}</div>
        <div className='justify-self-end'>{item.price * item.count}</div>
    </div>
  )
}

export default ItemContent 