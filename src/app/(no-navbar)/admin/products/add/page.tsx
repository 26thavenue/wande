'use client'

import React, { useEffect, useState } from 'react';
import { createProducts, getAllCategories } from '@/lib/data';
import Container from '@/components/Container';
import { CategoryType } from '@/lib/types';
import { z, ZodError } from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormProps {
  data: CategoryType[];
}

const schema = z.object({
  name: z.string().min(4, { message: 'Name must be at least 4 characters long' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  image: z.string().url({ message: 'Image URL is not valid' }),
  brand: z.string().min(3, { message: 'Brand must be at least 3 characters long' }),
  numberInStock: z.number().int().min(0, { message: 'Number in Stock must be a positive integer' }),
  category: z.string().min(1, { message: 'Category must be selected' }),
});

const AddProductFormDetails: React.FC<FormProps> = ({ data }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const product = {
        name: formData.get('name') as string,
        price: parseFloat(formData.get('price') as string),
        description: formData.get('description') as string,
        image: formData.get('image') as string,
        brand: formData.get('brand') as string,
        numberInStock: parseInt(formData.get('numberInStock') as string),
        category: formData.get('category') as string,
      };

      schema.parse(product);
      await createProducts(product);
      setError(null);
      alert('Product added successfully');
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
    <div className='flex justify-center items-center'>
      <Container>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
          <h3>Enter Product Name</h3>  
          <div className="mb-4 flex flex-col">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Product Name"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Brand
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="brand"
              name="brand"
              type="text"
              placeholder="Brand"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              name="price"
              type="number"
              placeholder="Price"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Number In Stock
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numberInStock"
              name="numberInStock"
              type="number"
              placeholder="Number of items"
            />
          </div>
          

          <div className="my-4 flex flex-col">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {data ? (
                    data.map((category) => (
                      <SelectGroup key={category.id}>
                        <SelectItem value={category.name} className="font-medium">
                          {category.name}
                        </SelectItem>
                      </SelectGroup>
                    ))
                  ) : (
                    <p>No Category</p>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AddProductFormDetails;


//CHECK THE VALIDATION
// CHECK THE CATEGORY DROPDOWN