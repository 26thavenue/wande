'use client'

import React, { useState } from 'react';
import Container from '@/components/Container';
import { z, ZodError } from 'zod';
import {createCategory} from '@/lib/data'
import toast, { Toaster } from 'react-hot-toast';
const schema = z.string().min(4, { message: 'Name must be at least 4 characters long' });


const Page = () => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      schema.parse(categoryName);
      const res = await createCategory({ name: categoryName })
      if(res) {
        toast.success('Category added successfully');
      }
      setCategoryName('');
      setError(null);
      
    } catch (err) {
       if (err instanceof ZodError) {
        setError(err.errors[0].message);
      } else {
        toast.error('Error adding product');
        console.log( err);
        
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  return (
    <div className="flex sm:mt-8  md:mt-14 xl:mt-20 lg:mt-20 justify-center h-screen bg-white">
      
        <form onSubmit={handleSubmit} className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
          <h1>Create a Category</h1>
          <div className="mb-4 flex flex-col">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Category
            </button>
          </div>
        </form>
        <Toaster />
      
    </div>
  );
};

export default Page;
