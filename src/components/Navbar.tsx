
'use client'

import { useUser, useAuth } from "@clerk/nextjs";
import { ChevronDown, ShoppingBasket } from "lucide-react";
import {
  Command,

  CommandInput,
 
} from "@/components/ui/command"
import { Separator } from "@/components/ui/separator"
import {Button} from "@/components/ui/button"
import { Cart } from "./cart-sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useCartStore } from "@/lib/cart";
import Container from "./Container";
import Link from 'next/link'
import { UserButton, UserProfile } from "@clerk/nextjs";
import {useEffect,useState} from "react"
import { getAllCategories } from "@/lib/data";
import { CategoryType } from "@/lib/types";
export function Navbar() {
  const { isSignedIn } = useAuth();
  const [data,setData] = useState([])
  const [error,setError] = useState(false)

  useEffect(() => {
    getAllCategories().then((data) => {
      // console.log(data)
      setData(data)
    }).catch((error) => {
      console.log(error)
      setError(true)
    })
  }, [])
 

  const { count } = useCartStore();

  return (
    <div className="grid bg-white shadow-sm sticky top-0 w-full z-50 ">
      <Container>
        <div className='flex justify-between items-center px-5 py-4 bottom-1'>
        <div className="flex items-center justify-center gap-6">
        <Link href='/'><p className="text-xl font-bold">STORE</p></Link>
        
       
          <DropdownMenu>
             <DropdownMenuTrigger asChild>
                <div className="flex gap-1 items-center justify-center cursor-pointer">
                  <p className="text-sm text-[#575757] ">CATEGORIES</p>
                  <ChevronDown className="w-3" />
                </div>
             </DropdownMenuTrigger>
             <DropdownMenuContent className="w-56 ">
              {
                data ? 
                data.map((category:CategoryType) => 
                   (
                   <Link href={`/category/${category.id}`} key={category.id} className="">
                    <DropdownMenuItem className="text-sm  uppercase">
                      {category.name}
                    </DropdownMenuItem>
                    </Link>)) : <p> No categories</p>
                    }
                  
              
              
               
             </DropdownMenuContent>
           </DropdownMenu>
          
        
      </div>
      

        <Command className="rounded-lg border  w-96 hidden md:block">
            <CommandInput placeholder="Search for building materials" />
            
          </Command>

        <div className="flex gap-3 items-center ">
           <Cart count={count()} />
           

          <div className="flex gap-3 items-center ">
            {isSignedIn ? (
              <div className=" ">
                  
                  <UserButton afterSignOutUrl='/'/>
              </div>)
             : (
              <div className="flex gap-3 items-center ">
                      <Link href='sign-in'>
                        <Button className="text-white text-sm rounded-xl"> Login</Button>
                      </Link>
                      <Link href='sign-up'>
                        <Button variant="secondary" className="text-sm"> Signup</Button>
                      </Link>
              </div>)  }
           
            
            
            
            
          </div>
        </div>
       
        
      </div>
      </Container>
      
      <Separator orientation="horizontal" className='bg-[#f8f8f8]'/>
      
      
    </div>
  )
}