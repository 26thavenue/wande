
'use client'
import React, { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { Product } from "@prisma/client"
import ProductCard from "@/components/ProductCard"

const ExploreCategory = ({products}:{products:Product[]}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));


  return (
    <div>
      <h1 className="my-16 uppercase  text-center text-xl font-bold font-jetBrains">Explore Category</h1>
      {loading &&(
             <div className="grid items-center justify-center  grid-cols-2 lg:grid-cols-3  gap-3 lg:gap-6  mt-4 ">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] lg:w-[250px] w-[150px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-5 lg:w-[250px] w-[150px]" />
                  <Skeleton className="h-5 lg:w-[200px] w-[110px]" />
                </div>
              </div>
               <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] lg:w-[250px] w-[150px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-5 lg:w-[250px] w-[150px]" />
                  <Skeleton className="h-5 lg:w-[200px] w-[110px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] lg:w-[250px] w-[150px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-5 lg:w-[250px] w-[150px]" />
                  <Skeleton className="h-5 lg:w-[200px] w-[110px]" />
                </div>
              </div>
               <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] lg:w-[250px] w-[150px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-5 lg:w-[250px] w-[150px]" />
                  <Skeleton className="h-5 lg:w-[200px] w-[110px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] lg:w-[250px] w-[150px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-5 lg:w-[250px] w-[150px]" />
                  <Skeleton className="h-5 lg:w-[200px] w-[110px]" />
                </div>
              </div>


          </div>
              
        ) }

        <div>
          <p>ALL</p>
          {uniqueCategories.map((category) => (
           <p className='uppercase'>{category}</p>
          ))}
              
        </div>


    </div>
  );
};

export default ExploreCategory;