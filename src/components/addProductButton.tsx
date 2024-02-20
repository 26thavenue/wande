import React from 'react'
import { Button } from "@/components/ui/button"

import Link from 'next/link'

const AddProductButton = () => {
  return (
    <div>
        <Link href='/admin/products/add'>
          <Button >Add a new Product</Button>
        </Link>
        
      
    </div>
  )
}

export default AddProductButton