"use client"
import { useCartStore } from "@/lib/cart"
import { useEffect, useState } from "react"
import { useUser} from "@clerk/nextjs";
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
import QuantityButton from './quantity-button';

export function Cart({count}:{count:number}) {
  const { cart } = useCartStore();
  const{remove:handleRemoveFromCart} = useCartStore()
  const [subTotal, setSubTotal] = useState(0);
  const {user} = useUser();
  const userID = user?.id ? user.id : ""
  
  useEffect(() => {
    const total = cart?.reduce((prev:any, curr:any) => prev + curr.price * curr.count, 0);
    setSubTotal(total);
  }, [cart]);
  
  // console.log(cart);

  return (
    <Sheet >
      <SheetTrigger asChild>
        <div className="flex gap-2 items-center text-white bg-black rounded-xl p-2">
            <ShoppingBasket className=" xl:w-4 xl:h-4 lg:h-4 lg:w-4 md:w-3 md:h-3 w-3 h-3" />
            <p className="text-[10px] xl:text-[12px] lg:text-[12px] ">{count}</p>
          </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> YOUR CART</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 my-3 h-[60vh]  overflow-y-auto no-scrollbar">
          {cart?.length > 0 && cart
            ? 
            cart.map((item:any, index:any) => 
            <div key={item.id} className="flex items-center  text-sm justify-between gap-4">
              <Image alt='cartItem' src={parseImageUrl(item.imageUrl)} width={50} height={50}/>
              <p className="w-4">{item.name}</p>
              <div className="flex flex-col gap-1 justify-center  items-center">
                
                <p className="text-right">${item.price}</p>
                <p className="text-center justify-self-start"> <QuantityButton product={item} userID={userID}/></p>
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
            <div className="flex flex-col gap-3 items-center justify-center w-full mt-8 h-fit">
               <Link href='/order' className="w-full">
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
