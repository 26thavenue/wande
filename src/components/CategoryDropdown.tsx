'use client'

import React, { useEffect } from 'react'
import {ChevronDown} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Product } from '@prisma/client'

import { getAllProducts } from "@/lib/productQueries"




const CategoryDropdown = ({products}:{products:Product[]}) => {

  // const [products, setProducts] = React.useState<any[]>([])

  // useEffect( () => {
  //   async function fetchData() {
  //     const data = await getAllProducts()
  //     console.log(data);
  //     setProducts(data)
  //   }
  //   fetchData()
    
  // }, [])


  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));



  return (
    <div >

        <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='font-satoshi  hidden lg:flex justify-center items-center gap-1  font-normal'>
              <p>Categories</p> 
              <ChevronDown className=' mt-[1.8px] w-4 ' size={16}/>
          </div>
        
          </DropdownMenuTrigger>
        <DropdownMenuContent>

          {uniqueCategories.map((category) => (
           <DropdownMenuItem key={category} className='uppercase'>{category}</DropdownMenuItem>
          ))}
         
        </DropdownMenuContent>
      </DropdownMenu>
        
        
    </div>

  )
}

export default CategoryDropdown