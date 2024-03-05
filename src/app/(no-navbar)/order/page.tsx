'use client'
import { useCartStore } from "@/lib/cart"
import React, { useState,useEffect } from 'react';
import { z, ZodError } from 'zod';
import Container from '@/components/Container'
import toast,{Toaster} from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import {parseImageUrl} from '@/lib/utils'
import Image from "next/image";
import Link from 'next/link'
import {formatNumber} from '@/lib/utils'
import { createOrder } from "@/lib/data";


const schema = z.object({
  address: z.string().min(5).max(100),
  phoneNumber: z.string().length(11),
});



const OrderForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [subTotal, setSubTotal] = useState(0);

  const { cart } = useCartStore();
  const {user} = useUser();
  
  const userId = user?.id;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const checkAdress = formData.get('address') as string 
    if(checkAdress === ''){
      setError('Address is required')
      return
    }
    const address = formData.get('address') as string + '' + formData.get('city') as string + '' + formData.get('state') as string;
    
    try {
      const order = {
        address: address,
        phoneNumber: formData.get('phoneNumber') as string,
        userId: userId,
      };
      
      console.log(order);
      schema.parse(order);
    
      await createOrder(order)
      // console.log(orderObject);
      setError(null);
      toast.success('Your order has been placed');
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
        console.log(err.errors);
        toast.error(err.errors[0].message);
      } else {
        console.error('Error adding product:', err);
        toast.error('Your order could not be placed at the moment, please try again later.');
        
      }
    }
  };

   useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    useEffect(() => {
   
    const getTotal = () =>{
        const { cart } = useCartStore.getState();
        if(cart){
            const total = cart?.reduce((prev, curr) => prev + curr.price * curr.count,0 );
            setSubTotal(total)
        return total 
        }
        
        
    }
    getTotal()
    // console.log(getTotal());
}, [useCartStore.getState().cart])



  return (
    <>
      {cart.length > 0 && cart ?  
      (
        <div className=' flex xl:flex-row md:flex-col l:flex-row flex-col-reverse  '>
      
        <div className='flex bg-white flex-col gap-4  font-semibold items-start justify-center w-3/5 mt-8 p-6'>
          <h2 className='text-2xl justify-self-start px-8  '> Billing Details</h2>
          <form onSubmit={handleSubmit} className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-full ">
            <div className="mb-4 flex flex-col gap-3">

              <div className=" flex flex-col mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-black/50 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  type="text"
                  placeholder=""
                />
              </div>
              <div className='flex w-full justify-between gap-2'>
                <div className=" flex flex-col mb-4 w-full">
                  <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                    City
                  </label>
                  <input
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-black/50 backdrop:leading-tight focus:outline-none focus:shadow-outline"
                    id="City"
                    name="city"
                    type="text"
                    title="City"
                    placeholder=""
                  />
                </div>

                <div className=" flex flex-col mb-4 w-full">
                  <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                    State
                  </label>
                  <input
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-black/50leading-tight focus:outline-none focus:shadow-outline"
                    id="state"
                    name="state"
                    type="text"
                    title="State"
                    placeholder=""
                  />
                </div>
              
              </div>
              <div className=" flex flex-col mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                  Home Address
                </label>
                <input
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-black/50 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  name="address"
                  type="text"
                  title="address"
                  placeholder=""
                />
              </div>
            </div>
             <div className=" flex flex-col mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                  Phone Number
                </label>
                <input
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-black/50 leading-tight focus:outline-none focus:shadow-outline"
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  title="phoneNumber"
                  placeholder=""
                />
              </div>
            <div className="mb-6 flex justify-between items-center ">
              <Link href='/cart' className='underline p-2 hover:no-underline transition'> Back to cart</Link>
               
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </form>
        
      </div>
      <div className=' w-2/5 flex flex-col '>
        <div className="flex flex-col max-h-[40%] p-6 mt-8  gap-6 ">
          {cart.length > 0 && cart
            ? 

            <>
            <h2 className="text-2xl font-semibold">Your Order</h2>
              {cart.map((item, index) => 
                <div key={item.id} className="flex p-6 xl:gap-24 lg:gap-20 md:gap-16 sm:gap-8  overflow-y-auto no-scrollbar    items-center   ">
                  <Image alt='cartItem' src={parseImageUrl(item.imageUrl)} width={50} height={50}/>
                  <div className="flex text-sm flex-col gap-1 justify-start  items-center">
                    <p>{item.name}</p>
                    
                    <p className="text-center justify-self-start">{item.count} pieces</p>
                    <p className="text-right">${item.price}</p>
                  
                  </div>
                
                </div>
            )}
             
              
            </>
            
            
            
          
            
            : <div><p  className="text-center text-slate-600 py-2">''</p></div>
          }
          </div>
           <div className="flex items-center gap-3  p-6">
                <p className="font-semibold text-sm">TOTAL:</p>
                <span className="font-bold text-xl">${formatNumber(subTotal)}</span>
            </div>
            <div className="bg-[#f6f6f6] flex flex-col gap-3 p-6">
              <h2 className="text-center text-xl p-4 font-bold">Payment Method</h2>
              <h3 className="text-sm font-semibold">Direct bank transfer</h3>
              <p className="text-sm mb-4">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
              {/* <h3 className="text-sm font-semibold">Pay with card</h3>
              <p className="text-sm">Not yet supported...</p> */}
              <Link href='/received'>
                   <Button type="submit"  className="float-right">
                  Place Order
                </Button>
              </Link>
            
            </div>  
      </div>
          
     </div>
      )
      : 
      (
        <div className="flex flex-col justify-center items-center p-2 gap-4 w-full h-screen ">
            <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl text-semibold">Your cart is empty </h1>
            <Link href="/products">
              <p className="text-lg text-[#dcdcdc] hover:underline transition ">Go to back to shopping</p>
            </Link>
        </div>
      )
        }
        <Toaster/>
   </>
  );
};

export default OrderForm;
