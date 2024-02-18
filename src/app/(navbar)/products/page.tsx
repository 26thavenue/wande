'use client'

import React from 'react'
import { ProductType } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Container from '@/components/Container'
import { getAllProducts } from '@/lib/data'
import ProductCard from '@/components/product-card'
import { set } from 'zod'

export  function pages()  {
   const [products, setProducts] = React.useState([])
   const[loading,setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    getAllProducts().then(data => setProducts(data), ).catch(err => console.log(err))
    setLoading(false)
  }, [])
  return (
    <div>
      <Container>
        <p className='text-center text-2xl my-6 font-bold'>PRODUCTS</p>
        {loading && <p>Loading...</p>}
        <div className='flex p-6 justify-between'>
            <p className=''>Showing {products.length} results of {products.length}</p>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort Product" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="apple">Alphabetical Order:Ascending Order</SelectItem>
                    <SelectItem value="banana">Alphabetical Order:Ascending Order</SelectItem>
                    <SelectItem value="blueberry">Price:Highest to Lowest</SelectItem>
                    <SelectItem value="grapes">Price: Lowest to Highest </SelectItem>
                    <SelectItem value="pineapple">Newest</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 items-center  justify-center gap-4 py-6 ">
            {products ? ( 
              products.map((product:ProductType) => (                
                <ProductCard 
                    key={product.id} 
                    id={product.id}
                    name={product.name} 
                    price={product.price}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    brand={product.brand}
                />
                    ))
                    ) :  <p>Loading...</p>}
        </div>
      </Container>
    </div>
  )
}

export default pages