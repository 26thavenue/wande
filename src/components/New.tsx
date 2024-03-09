'use client'
import React from 'react'
import {ProductType} from '@/lib/types'
import { Separator } from '@/components/ui/separator'
import ProductCard from '@/components/product-card'
import { getAllProducts } from '@/lib/data'
import { PuffLoader } from 'react-spinners'


const Newest = () => {
  const [products, setProducts] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    getAllProducts().then(data => 
     { 
      setLoading(true)
      setProducts(data)
      setLoading(false)
    }
      ).catch(err => console.log(err))
  }, [])
  

  return (
    <div className='mx-auto w-full '>
        <p className="text-xl  p-6">NEWEST PRODUCTS</p>
        <Separator orientation='horizontal' className="w-full" />
        {loading ? 
        <div className="h-screen flex justify-center items-center">
                 <PuffLoader color="#b6b6b6" className="mx-auto "/>
            </div> : 
            (
              <div className="text-sm pt-4 grid  grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products ? products.slice(0, 10).map((product:ProductType) => 
                  <ProductCard key={product.id} 
                  id={product.id} 
                  name={product.name} 
                  price={product.price}
                  description={product.description}
                  numberInStock={product.numberInStock}
                  categoryId={product.categoryId}
                  categoryName={product.categoryName}
                  image = {product.image}
                  imageUrl={product.imageUrl}
                  brand={product.brand}
                  product={product}
                  />
              ): <p>No products available</p>}
        </div>
            )
        }
       

    </div>
  )
}

export default Newest