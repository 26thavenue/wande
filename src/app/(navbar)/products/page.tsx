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
import CustomPagination from '@/components/Pagination'
export  function pages()  {
   const [products, setProducts] = React.useState([])
   const[loading,setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    getAllProducts().then(data => setProducts(data), ).catch(err => console.log(err))
    setLoading(false)
  }, [])

    // React.useEffect(() => {
    //     useCartStore.persist.rehydrate();
    // }, []);
  return (
    <div>
      <Container>
        <p className="text-2xl font-bold text-center mt-6 text-slate-700"> Explore our Products</p>
        <CustomPagination/>
      </Container>
      
    </div>
  )
}

export default pages