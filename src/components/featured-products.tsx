'use client'
import React from 'react'
import {ProductType} from '@/lib/types'
import { Separator } from '@/components/ui/separator'
import ProductCard from '@/components/product-card'
import { getAllProducts } from '@/lib/data'



const FeaturedProducts = () => {
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    getAllProducts().then(data => setProducts(data)).catch(err => console.log(err))
  }, [])
  

  return (
    <div className='mx-auto w-full '>
        <p className="text-xl  p-6">FEATURED PRODUCTS</p>
        <Separator orientation='horizontal' className="w-full" />
        <div className="text-sm pt-4 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product:ProductType) => 
                <ProductCard key={product.id} 
                id={product.id} 
                name={product.name} 
                price={product.price}
                description={product.description}
                imageUrl={product.imageUrl}
                brand={product.brand}
                />
            )}
        </div>

    </div>
  )
}

export default FeaturedProducts