'use client'
import React from 'react'
import {ProductType} from '@/lib/types'
import { Separator } from '@/components/ui/separator'
import ProductCard from '@/components/product-card'
import { getAllProducts } from '@/lib/data'
import { PuffLoader } from 'react-spinners'


const ProductsPage = () => {
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
   const productLength = products.length

   const handleMoreProducts = () => {
      console.log('more products')

    }

  return (
    <div className='mx-auto w-full '>
        <p className="text-xl  p-6">FEATURED PRODUCTS</p>
        <Separator orientation='horizontal' className="w-full" />
        {loading ? 
        <div className="h-screen flex justify-center items-center">
                 <PuffLoader color="#b6b6b6" className="mx-auto "/>
            </div> : 
            (
              <>
              
              <div className="text-sm pt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products ? products.slice(0, 20).map((product:ProductType) => 
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
            {
              productLength > 20 && <button className='bg-[#f6f6f6] text-black text-sm hover:bg-slate-100 transition '>Load More</button>

            }
            
            </>
            )
        }
       

    </div>
  )
}

export default ProductsPage