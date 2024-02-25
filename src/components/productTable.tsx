'use client'

import React from 'react'
import { ProductType } from '@/lib/types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from '@/components/ui/separator'
import {  getAllProducts } from '@/lib/data'
import { MoreHorizontal } from 'lucide-react'
import { useEffect,useState } from 'react'

export  function ProductTable()  {
  const[products,setProducts] = useState([])
  
  useEffect(() => {
    getAllProducts().then((data) => { setProducts(data) }).catch((error) => { console.log(error) })
  }
  , [])
  return (
    <div>
        <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader className='bg-muted'>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Number In Stock</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Brand</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product:ProductType) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.numberInStock}</TableCell>

            <TableCell className="font-medium">{product.categoryName}</TableCell>
            <TableCell className="text-right">{product.brand}</TableCell>
            <TableCell className="text-right flex justify-end ">
              <div>
                  <DropdownMenu >
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className='text-black '/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Update Product
                        
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                      DeleteProduct
                        
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
            
          </TableRow>
        ))}
        <TableCell className="text-right"></TableCell>
      </TableBody>
      
    </Table>
    <div className="flex w-full text-xs text-[#b6b6b6]  justify-end items-center gap-4 my-4 cursor-pointer">
        <p className='hover:text-black'>Previous</p>
          <Separator orientation="vertical" className='h-4' />
          <p className='hover:text-black'>Next</p>
      </div>
    </div>
  )
}

export default ProductTable