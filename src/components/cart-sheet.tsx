"use client"
import { useCartStore } from "@/lib/cart"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CartItemType } from "@/lib/types"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingBasket } from "lucide-react";
import Link from 'next/link'
import Image from 'next/image'
import { parseImageUrl } from "@/lib/utils"

export function Cart({count}:{count:number}) {
  const { cart } = useCartStore();
  const{remove:handleRemoveFromCart} = useCartStore()
  const [subTotal, setSubTotal] = useState(0);
  // console.log(cart)
  
  useEffect(() => {
    const total = cart.reduce((prev, curr) => prev + curr.price * curr.count, 0);
    setSubTotal(total);
  }, [cart]);
  
  console.log(cart);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex gap-2 items-center text-white bg-black rounded-xl p-2">
            <ShoppingBasket className="w-4 h-4" />
            <p className="text-[12px]">{count}</p>
          </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> YOUR CART</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 mb-3">
          {cart.length > 0 && cart
            ? 
            cart.map((item, index) => 
            <div key={item.id} className="flex items-center justify-between gap-2">
              <Image alt='cartItem' src={parseImageUrl(item.imageUrl)} width={150} height={150}/>
              <div className="flex flex-col gap-1 justify-start  items-center">
                <p>{item.name}</p>
                <p className="text-right">${item.price}</p>
                <p className="text-center justify-self-start">{item.quantity}</p>
                <p className="text-center">
                  <button
                  className="underline hover:scale-95 transition"
                  onClick={() => handleRemoveFromCart(item.id ? item.id : '')} 
                   > Remove</button>
                </p>
              </div>
              
            </div>)
            
            
            : <div><p  className="text-center text-slate-600 py-2">No Data</p></div>
          }
          <p> SUBTOTAL : <span> ${subTotal}</span> </p>
        </div>

        
        <SheetFooter>
            
          <SheetClose asChild>
            <div className="flex flex-col gap-3 items-center justify-center w-full mt-8 ">
               <Link href='/checkout' className="w-full">
              <button type="submit" className="w-full bg-black hover:bg-black/75 p-3 rounded-md  text-white"> CHECKOUT </button>
              </Link>
              <Link href='/cart' className="w-full">
                <button type="submit" className="w-full bg-[#dddddd] p-3 rounded-md  text-black hover:bg-[#dddddd]/35"> View Cart </button>
              </Link>
            
            </div>
           
          </SheetClose>
          
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
