

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

import { MoreHorizontal } from 'lucide-react'


export async function ProductTable()  {
  const res = await fetch('http://localhost:3000/api/product')
  const data = await res.json()
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
        {data.map((product:ProductType) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.numberInStock}</TableCell>
            <TableCell className="text-right">{product.categoryName}</TableCell>
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
        <p>Previous</p>
          <Separator orientation="vertical" className='h-4' />
          <p>Next</p>
      </div>
    </div>
  )
}

export default ProductTable