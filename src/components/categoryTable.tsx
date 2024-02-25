'use client'

import React from 'react'
import { CategoryType } from '@/lib/types'
import { getAllCategories } from '@/lib/data'
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


export  function CategoryTable()  {
  const[ data, setData] = React.useState<CategoryType[] | null>([])
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategories()
      setData(data)
    }
    fetchData()
  }, [])
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
        {data && data.length > 0 ? data.map((category:CategoryType) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name.toUpperCase()}</TableCell>
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
        )): <p>  </p>}
        <TableCell className="text-right"></TableCell>
      </TableBody>
      
    </Table>
    </div>
  )
}

export default CategoryTable