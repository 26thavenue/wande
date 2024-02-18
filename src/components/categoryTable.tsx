

import React from 'react'
import { CategoryType } from '@/lib/types'
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


export async function CategoryTable()  {
  const res = await fetch('http://localhost:3000/api/category')
  const data = await res.json()
  // console.log(data);
  return (
    <div>
        <Table className='w-1/2'>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader className='bg-muted'>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Number of Products</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data ? data.map((category:CategoryType) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell className="font-medium">{category.products ? <p className="font-medium my-auto ">{category.products.length}  products </p> : <p>0 products</p>}</TableCell>

            
            
        
            <TableCell className="text-right flex justify-end ">
              <div>
                  <DropdownMenu >
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className='text-black '/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuGroup>

                      <DropdownMenuItem>
                      Delete Category
                        
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
            
          </TableRow>
        )): <p>No Category</p>}
        <TableCell className="text-right"></TableCell>
      </TableBody>
      
    </Table>
    </div>
  )
}

export default CategoryTable