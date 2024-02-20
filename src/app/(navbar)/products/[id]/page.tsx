import ProductDetails from "@/components/product-details"
import  Container  from "@/components/Container"
import React from 'react'
import { getProductById } from "@/lib/data"


const page = () => {

  return (
    <div className="p-8">
        
        <ProductDetails 
        product.id={product}/>
    </div>
  )
}

export default page