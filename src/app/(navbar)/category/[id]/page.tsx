'use client'

import React, { useEffect, useState } from 'react';
import { getCategoryById } from '@/lib/data';
import { CategoryType, ProductType } from '@/lib/types';
import Container from '@/components/Container';
import ProductCard from '@/components/product-card';
import { usePathname } from 'next/navigation';
import { PuffLoader } from "react-spinners";


export default function CategoryPage() {
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data,setData] =useState<CategoryType|null>(null)
  const pathname = usePathname()

  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  // console.log(id);'

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategoryById(id);
        setCategory(categoryData);
        setLoading(false);
        console.log(categoryData);
      } catch (error) {
        console.error('Error fetching category:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  if (loading) {
    return  <div className="h-screen flex justify-center items-center">

                 <PuffLoader color="#b6b6b6" className="mx-auto "/>
              </div>;
  }

  if (error) {
    return <div>Error occurred while fetching category</div>;
  }

  return (
    <div className="flex items-center justify-center flex-col mt-10 gap-6">
      <Container>
        <h1 className="text-2xl font-semibold mb-2">{category?.name.toUpperCase()}</h1>
        
        {category?.products && category?.products.length > 0? (
          
          <div >
            <h2 className='text-[#898989]'>Explore products in the {category?.name} category</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {category.products.map((product: ProductType) => (
              
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                description={product.description}
                numberInStock={product.numberInStock}
                brand={product.brand}
              />
            ))}
            </div>
            
          </div>
        ) : (
          <p>No products found in this category.</p>
        )}
      </Container>
    </div>
  );
};


