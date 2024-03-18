
import React from 'react'
import Container  from '@/components/Container'
import {ProductTable} from '@/components/productTable'
import { Input } from '@/components/ui/input'
import AddCategoryButton from '@/components/addCategoryButton'
import CategoryTable from '@/components/categoryTable'

export default  function AdminCategoryPage (){
  
  return (
    <Container>
      <h1 className='font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2  mt-3'>Category</h1>
      <h4 className='text-xs text-[#b6b6b6] mb-6'> Manage your categories</h4>
      <div className='flex gap-8 justify-end '>
  
          <AddCategoryButton/>
      </div>      
      <CategoryTable/>
      
    </Container>
  )
}



