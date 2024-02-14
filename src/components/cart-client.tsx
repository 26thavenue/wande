'use client'
import { Button } from './ui/button';
import { useCartStore } from '@/lib/cart';
import { MoveLeft } from 'lucide-react';
import React from 'react'
import Link from 'next/link'
import ItemContent from './item-content';
import { useEffect,useState } from 'react';

const CartClient = () => {
   const [subTotal, setSubTotal] = useState(0);
   

    useEffect(() => {
   
    const getTotal = () =>{
        const { cart } = useCartStore.getState();
        if(cart){
            const total = cart?.reduce((prev, curr) => prev + curr.price * curr.quantity,0 );
            setSubTotal(total)
        return total 
        }
        
        
    }
    getTotal()
    // console.log(getTotal());
}, [useCartStore.getState().cart])
  const { cart } = useCartStore();
  const {removeAll:handleRemoveAllFromCart} = useCartStore()
  return (
    <div>
        {cart.length ? 
        <div>
            <h1 className='text-3xl'>YOUR CART</h1>
            <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8 '>
                <div className='col-span-2 justify-self-center'>
                    <p>PRODUCT</p>
                </div>
                <div className=' justify-self-center' >
                    <p>PRICE</p>
                </div>
                <div className='justify-self-center' >
                    <p>QUANTITY</p>
                </div>
                <div className='justify-self-end' >
                    <p>TOTAL</p>
                </div>

            </div>
            <div>
                {cart.map((item,index) => {
                    return(
                        <ItemContent key={item.id} item={item}/>
                    )
                })}
            </div>

            <div className='border-t-[1.5px] my-6 border-slate-100 py-4 flex  justify-between gap-4 '>
                 <div className='w-[96px]'>
                    <Button 
                    onClick={() => handleRemoveAllFromCart()}
                    variant='secondary' className='p-2'>Clear Cart</Button>
                 </div>
                 <div className='flex flex-col gap-4 text-sm items-start '>
                    
                        <div className='flex justify-between w-full text-base font-semibold'>
                            <p>SUBTOTAL</p>
                            <span> ${subTotal}</span>
                        </div>
                         <Link href='/payment'>
                            <Button type="submit"> CHECKOUT </Button>
                        </Link>
                        
                        <Link href='/' className='cursor-pointer text-center flex items-center gap-3 mx-auto'>
                        <MoveLeft />
                        <p className='text-sm text-[rgb(146,145,145)] hover:underline transistion'>Continue shopping</p>
                        </Link>
                    
                 </div>
            </div>
        </div> 
        
        : 
          <div className='mx-auto flex flex-col gap-4  '>
              <p  className="text-center text-[rgb(182,182,182)] py-2 text-sm">No items in your Cart</p>
              
                <Link href='/' className='cursor-pointer text-center flex items-center gap-3 mx-auto'>
                  <MoveLeft />
                   <p className='text-sm text-[rgb(146,145,145)] hover:underline transistion'>Go back to shopping</p>
                </Link>
                
               
              

              </div>

        }

    </div>
  )
}

export default CartClient