import {ShoppingBag} from 'lucide-react'
import { Button } from '@/components/ui/button'
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


const CartButton = () => {
  return (
    <div className='cursor-pointer'>
      <Sheet>
         <SheetTrigger asChild>
            <ShoppingBag />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Cart</SheetTitle>
              <SheetClose />
            </SheetHeader>
            <SheetDescription>
              Your cart is empty.
            </SheetDescription>
            <SheetFooter>
              <Button className="" variant='secondary'>Checkout</Button>
            </SheetFooter>
          </SheetContent>
      </Sheet>
       
        
    </div>
  )
}

export default CartButton