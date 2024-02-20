'use client'

import React, { useState } from 'react';
import Container from '@/components/Container';
import { z, ZodError } from 'zod';
import {createCategory} from '@/lib/data'
const schema = z.string().min(4, { message: 'Name must be at least 4 characters long' });

const Page = () => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      schema.parse(categoryName);
      const response = await createCategory({ name: categoryName })
      const data = await response.json;
      if (!response.ok) {
        setError(data.error || 'Failed to add category');
        return;
      }
      setCategoryName('');
      setError(null);
      alert('Category added successfully');
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Failed to add category');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Container>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
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
      </Container>
    </div>
  );
};

export default Page;
