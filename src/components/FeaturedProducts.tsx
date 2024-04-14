'use client'

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Product } from "@prisma/client"
import ProductCard from "@/components/ProductCard"


const FeaturedProducts = ({products}:{products:Product[]}) => {

  const [loading, setLoading] = useState(true);
  

  
  return (
    <div className="my-12 px-6">
      <h2 className="font-satoshi text-xl font-normal mb-4">Featured Products</h2>
      <Separator className="space-y-4" />
      
      {loading  && 
          <div className="grid items-center  grid-cols-2 lg:grid-cols-3 space-x-4 gap-6  mt-4 ">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>


          </div>
      }
      <div className="grid items-center p-6  grid-cols-2 lg:grid-cols-4  gap-6  mt-4 ">
         {products.map((product) =>(
        <ProductCard key={product.id} product={product} />
      
      ))}
      </div>
     
     
    </div>
  )
}

export default FeaturedProducts