"use client"
import { useCartStore } from "@/lib/cart"
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

export function Cart({count}:{count:number}) {
  const { cart } = useCartStore();
  const{remove:handleRemoveFromCart} = useCartStore()

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
              <p className="text-center">{index + 1}</p>
              <p>{item.name}</p>
              <p className="text-right">{item.price}</p>
              <p className="text-center">{item.count}</p>
              <p className="text-right">{item.count * item.price}</p>
              <p className="text-center">
                <Button
                onClick={() => handleRemoveFromCart(item.id)} 
                variant="destructive" > X</Button>
              </p>
            </div>)
            : <div><p  className="text-center text-slate-600 py-2">No Data</p></div>
          }
          <p>SUBTOTAL : </p>
        </div>

        
        <SheetFooter>
            
          <SheetClose asChild>
            <Button type="submit"> CHECKOUT </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
