'use client'

import React, { useEffect, useState } from 'react';
import { createProducts, getAllCategories } from '@/lib/data';
import { CategoryType } from '@/lib/types';
import { z, ZodError } from 'zod';
import toast,{Toaster} from 'react-hot-toast';


// interface FormProps {
//   data: CategoryType[];
// }


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


const schema = z.object({
  name: z.string().min(4, { message: 'Name must be at least 4 characters long' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  image:  z.any()
              .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
              .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported."
              ),
  brand: z.string().min(3, { message: 'Brand must be at least 3 characters long' }),
  numberInStock: z.number().int().min(1, { message: 'Number in Stock must be a positive integer' }),
  categoryId: z.string().min(1, { message: 'Invalid category Id' }),
  categoryName: z.string().min(1, { message: 'Invalid category Name' }),
});

export default function  AddProductFormDetails(){
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [file, setFile] = useState<File>()

  useEffect(() => {
    getAllCategories()
     .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      }); 
  },[])



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const product = {
        name: formData.get('name') as string,
        price: parseFloat(formData.get('price') as string),
        description: formData.get('description') as string,
        image: formData.get('file') as File,
        brand: formData.get('brand') as string,
        numberInStock: parseInt(formData.get('numberInStock') as string),
        categoryId: selectedCategory as string ,
        categoryName: selectedCategoryName as string
      };
      formData.append('image', product.image);
      formData.append('categoryId', product.categoryId);
      formData.append('categoryName', product.categoryName);
      formData.delete('file');
      schema.parse(product);
      await createProducts(formData) ;
      setError(null);
      toast.success('Product added successfully');
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
        console.log(err.errors);
        toast.error(err.errors[0].message);
      } else {
        console.error('Error adding product:', err);
        toast.error('Error adding product');
        
      }
    }
  };

  return (
    <div className='bg-white flex flex-col gap-1 font-semibold items-center justify-center  w-full  h-full'>
      
        <form onSubmit={handleSubmit} className=" border-[#f6f6f6] px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
          <h3 className='p-2 text-xl font-semibold'>Enter Product Details</h3>  
          <div className=" flex flex-col">
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
          <div className="flex flex-col">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded h-32 o w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              type = 'text'
              placeholder="Enter a Description "
            />
          </div>
          <div className=" flex flex-col">
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
          <div className=" flex flex-col">
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
          <div className=" flex flex-col">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Number In Stock
            </label>
            <input
              className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numberInStock"
              name="numberInStock"
              type="number"
              placeholder="Number in Stock"
            />
            
          </div>
          <div className=" flex flex-col">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Image
            </label>
            <input
              
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="file"
              name="file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0])}
              placeholder="Category"
            />

          </div>
          
            {categories && categories.length > 0 ? (
              <div className="my-8 flex flex-col">
                <select
                  className='p-3'
                  title='Category'
                  onChange={(e) => {
                    setSelectedCategory(e.target.value.toString())
                    const catName = categories.find((category) => category.id === e.target.value.toString()) as unknown as CategoryType
                    setSelectedCategoryName(catName.name);
                  }} // Attach onChange to select element
                >
                  <option value="" className='p-2'>--Please choose a category --</option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      
                    >
                      {category.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p>No categories available</p>
            )}

          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          {categories && categories.length > 0   ? (
            <div className="flex items-center justify-between">
            <button
              name ='submit'
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Product
            </button>
          </div>
          ):<button disabled className="p-6 text-black bg-white" >Add a Product</button>}
          
        </form>
        <Toaster />
    </div>
  );
};



