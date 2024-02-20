'use client'

import React, { useState } from 'react';
import { z, ZodError } from 'zod';
import Container from '@/components/Container'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link'
const schema = z.object({
  address: z.string().min(5).max(100),
  phoneNumber: z.string().length(10),
});

const OrderForm = () => {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const {user} = useUser();
  console.log(user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      schema.parse({ address, phoneNumber });
      //await order.create
      setAddress('');
      setPhoneNumber('');
      setError(null);
      toast.success('Order placed successfully');
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
      } else {
        console.error('Error adding product:', err);
        alert('Error adding product');
      }
    }
  };

  return (
    <div className=' flex xl:flex-row md:flex-col l:flex-row flex-col-reverse  '>
      
      <div className='bg-white flex flex-col gap-4 font-semibold items-center justify-center  w-1/2 h-screen'>
        <h2 className='text-2xl'> Order Information</h2>
        <form onSubmit={handleSubmit} className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
          <div className="mb-4 flex flex-col gap-3">

            <div className='flex gap-2 '>
            <div className="flex flex-col gap-1">
              <label className=" text-black text-sm  mb-2" htmlFor="address">
              First Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value=''
              title = 'lastName'
              onChange={(e) => (e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <div className="flex flex-col gap-1">
              <label className=" text-black text-sm  mb-2" htmlFor="address">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value=''
              title = 'lastName'
              onChange={(e) => (e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            
            </div>
            <div className='flex gap-2'>
            <div className="flex flex-col gap-1">
              <label className="block text-black text-sm  mb-2" htmlFor="address">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value=''
              title = 'City'
              onChange={(e) => (e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-black text-sm  mb-2" htmlFor="address">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value=''
              title = 'State'
              onChange={(e) => (e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            
            </div>
            <label className="block text-black text-sm  mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-black  text-sm  mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6 flex justify-between items-center ">
            <Link href='/order' className='underline p-2 hover:no-underline transition'> Back to cart</Link>
            <Button type="submit" >
              Place Order
            </Button>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </form>
        
      </div>
      <div className='bg-[#b6b6b6] w-1/2 h-screen flex flex-col'>

        
      </div>
      
    </div>
  );
};

export default OrderForm;
