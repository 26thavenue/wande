import React from 'react'
import { Button } from "@/components/ui/button"

import Link from 'next/link'

const AddCatgeoryButton = () => {
  return (
    <div>
        <Link href='/admin/category/add'>
          <Button >Add a new Category</Button>
        </Link>
        
      
    </div>
  )
}

export default AddCatgeoryButton