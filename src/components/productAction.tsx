import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <MoreHorizontal className='text-black '/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
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
  )
}

const ProductAction = () => {
  
  return (
    <div className='bg-green-100'>
        <DropdownMenu/>
    </div>
  )
}

export default ProductAction