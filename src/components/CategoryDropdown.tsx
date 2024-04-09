import React from 'react'
import {ChevronDown} from 'lucide-react'

const CategoryDropdown = () => {
  return (
    <div className='font-satoshi flex justify-center items-center gap-1  font-normal'>
        <p>Categories</p>
        <ChevronDown className=' mt-[1.8px] w-4 ' size={16}/>
    </div>

  )
}

export default CategoryDropdown