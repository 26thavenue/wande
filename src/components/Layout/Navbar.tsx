import React from 'react'
import SearchBar from '../SearchBar'
import CartButton from '../CartButton'
import { Button } from '@/components/ui/button'
import { Loader} from 'lucide-react'
import { ClerkLoading, ClerkLoaded, SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs'
import CategoryDropdown from '@/components/CategoryDropdown' 
import MenuDropdown from '@/components/MenuDropdown'
import Link from 'next/link'


const Navbar = () => {
  return (
    
       <div className=' max-w-[1920px] px-6  lg:px-20  shadow-sm  flex justify-between items-center  py-3 '>

        <div className='flex gap-8 items-center justify-center '>
            <Link href='/'>
              <h1 className=' font-ojuju text-2xl font-extrabold '>Nuno</h1>
            </Link>
          
            <CategoryDropdown />
        </div>
      
        <SearchBar className='lg:w-[250px] w-60' params='Search for products' />

        <div className='lg:hidden'>
          <CartButton/>
        </div>

        <div className='lg:flex gap-6 justify-center items-center hidden'>
            <CartButton />
        
            <ClerkLoading>
              <Loader className='text-muted-foreground h-5 w-5 animate-spin ' />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <UserButton
                afterSignOutUrl='/'
                />
              </SignedIn>
              <SignedOut>
                <SignInButton
                mode='modal'

                >
                  <Button variant='ghost' className='font-satoshi font-light tracking-wide text-[16px] rounded-sm'> Login</Button>
                </SignInButton>

              </SignedOut>
            </ClerkLoaded>
        </div>

        

        
        {/* <div className=' lg:flex hidden  items-center justify-center gap-8'>
          
          
          <Button variant='ghost' className='font-satoshi font-light tracking-wide text-[16px] rounded-sm'> SignUp</Button>
        </div> */}
        <MenuDropdown/>

      

       </div>
    
   
  )
}

export default Navbar