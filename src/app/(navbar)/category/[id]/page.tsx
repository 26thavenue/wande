'use client'

import React, { useEffect, useState } from 'react';
import { getCategoryById } from '@/lib/data';
import { CategoryType, ProductType } from '@/lib/types';
import Container from '@/components/Container';
import ProductCard from '@/components/product-card';
import { usePathname } from 'next/navigation';

const CategoryPage = () => {
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching category</div>;
  }

  return (
    <div className="flex items-center justify-center flex-col mt-10 gap-6">
      <Container>
        <h1 className="text-2xl font-semibold">{category?.name}</h1>
        <h2>Explore products in the {category?.name} category</h2>
        {category?.products ? (
          
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
        ) : (
          <p>No products found in this category.</p>
        )}
      </Container>
    </div>
  );
};

export default CategoryPage;
