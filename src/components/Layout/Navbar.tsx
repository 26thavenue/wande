import React from 'react'
import SearchBar from '../SearchBar'
import CartButton from '../CartButton'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import CategoryDropdown from '@/components/CategoryDropdown' 


const Navbar = () => {
  return (
    <div className='max-w-[1986px]  shadow-sm p-3 flex justify-evenly items-center px-6 py-3 '>
      <h1 className=' font-ojuju text-2xl font-extrabold '>Nuno</h1>
      <CategoryDropdown />
      <SearchBar className='' params='Search for products' />
      
      <div className='flex items-center justify-center gap-8'>
        <CartButton />
        <Button className='font-satoshi font-light tracking-wide text-[16px] rounded-sm'> Login</Button>
        <Button variant='ghost' className='font-satoshi font-light tracking-wide text-[16px] rounded-sm'> SignUp</Button>
      </div>
      

    </div>
  )
}

export default Navbar