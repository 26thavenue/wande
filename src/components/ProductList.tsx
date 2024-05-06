'use client'

import { Product } from '@prisma/client'
import { useEffect } from 'react'
import React from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '@/lib/data'
import {Loader} from 'lucide-react'




const ProductList = () => {

  const [products, setProducts] = React.useState<Product[]>([])

  const [loading, setLoading] = React.useState(true)

  

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts()
      setLoading(false)
      setProducts(data)
      console.log(data);
    }
    fetchData()
  }, [])    

  return (
    <div className='p-6 mt-6'>
        { loading && 
        (
          <div className='h-full w-full flex items-center justify-center'>
            <Loader className='w-6 h-6 text-muted-foreground animate-spin'/>
          </div>
            )
        }
        {!loading && products.length === 0 && <p className='text-center text-lg'>No products available</p>}
        {!loading && 
        <div className='p-6 justify-between flex items-center '>
          <h1 className='font-jetBrains text-xl  font-bold '>Shop Our Products</h1>
          
        </div>
        }
        <div  className="grid items-center p-6  grid-cols-2 lg:grid-cols-4  gap-6  mt-4 ">
          
          { !loading && 
          
            products?.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))
          }
        </div>
        
    </div>
  )
}

export default ProductList