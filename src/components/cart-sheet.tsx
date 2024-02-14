"use client"
import { useCartStore } from "@/lib/cart"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
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

export function Cart({count}:{count:number}) {
  const { cart } = useCartStore();
  const{remove:handleRemoveFromCart} = useCartStore()
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
          {cart.length 
            ? cart.map((item, index) => 
            <div key={item.id} className="flex items-center justify-between gap-2">
              <Image alt='cartItem' src={item.imageUrl} width={150} height={150}/>
              <div className="flex flex-col gap-1 justify-start  items-center">
                <p>{item.name}</p>
                <p className="text-right">${item.price}</p>
                <p className="text-center justify-self-start">{item.quantity}</p>
                <p className="text-center">
                  <button
                  className="underline hover:scale-95 transition"
                  onClick={() => handleRemoveFromCart(item.id)} 
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
            <Link href='/payment'>
              <Button type="submit"> CHECKOUT </Button>
            </Link>
            
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
