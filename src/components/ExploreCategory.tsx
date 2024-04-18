
'use client'
import React, { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { Product } from "@prisma/client"
import ProductCard from "@/components/ProductCard"
import { getProducts } from '@/lib/data'

const ExploreCategory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])   

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId === activeCategory ? 'all' : categoryId);
  };

  const filteredProducts = activeCategory === 'all' ? products : products.filter(product => product.category === activeCategory);
  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

  return (
    <div>
      <h1 className="my-16 uppercase text-center text-xl font-bold font-jetBrains">Explore Category</h1>
      {loading && (
        <div className="grid items-center justify-center grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mt-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] lg:w-[250px] w-[150px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 lg:w-[250px] w-[150px]" />
                <Skeleton className="h-5 lg:w-[200px] w-[110px]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className='flex overflow-x-auto no-scrollbar gap-4 uppercase cursor-pointer items-center justify-center'>
          <div
            className={`cursor-pointer ${activeCategory === 'all' ? 'bg-black text-white rounded-md' : ''}`}
            onClick={() => handleCategoryClick('all')}
          >
            <h1 className="hover:bg-[#b6b6b6]/10 p-3 rounded-md">All</h1>
          </div>
          {uniqueCategories.map((category) => (
            <div
              key={category}
              className={`cursor-pointer ${activeCategory === category ? 'bg-black text-white rounded-md' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <h1 className="hover:bg-[#b6b6b6]/10 p-3 transition rounded-md">{category}</h1>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid items-center p-6 grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreCategory;
