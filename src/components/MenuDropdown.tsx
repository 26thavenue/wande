import { Menu } from "lucide-react"
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader} from 'lucide-react'
import { ClerkLoading, ClerkLoaded, SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs'

const MenuDropdown = () => {
  return (
    <div className=' block lg:hidden'>  
        <DropdownMenu>
          <DropdownMenuTrigger><Menu/></DropdownMenuTrigger>
          <DropdownMenuContent>
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
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default MenuDropdown