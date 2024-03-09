
'use client'

import { useUser, useAuth } from "@clerk/nextjs";
import { ChevronDown, ShoppingBasket } from "lucide-react";

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

import { useCartStore  } from "@/lib/cart";
import Container from "./Container";
import Link from 'next/link'
import { UserButton} from "@clerk/nextjs";
import {useEffect,useState} from "react"
import { getAllCategories } from "@/lib/data";
import { CategoryType } from "@/lib/types";
import SearchBar from "@/components/searchInput";


export function Navbar() {
  const { isSignedIn } = useAuth();
  const {user} = useUser();
  const [data,setData] = useState([])
  const [error,setError] = useState(false)
  const { count, populateCart } = useCartStore();

  useEffect(() => {
    getAllCategories().then((data) => {
      setData(data)
    }).catch((error) => {
      console.log(error)
      setError(true)
    })
    
  }, [])

  useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);
  
 

  
 

  return (
    <div className="grid bg-white shadow-sm sticky top-0 w-full z-50 ">
      <Container>
        <div className='flex justify-between items-center  py-4 bottom-1'>
        <div className="flex items-center justify-center gap-6">
        <Link href='/'><p className="text-xl font-bold">STORE</p></Link>
        
       
          <DropdownMenu >
             <DropdownMenuTrigger asChild>
                <div className="flex gap-1 items-center justify-center cursor-pointer">
                  <p className="text-sm text-[#575757] hidden xl:block lg:block md:block  ">CATEGORIES</p>
                  <ChevronDown className="w-3 hidden xl:block lg:block md:block  " />
                </div>
             </DropdownMenuTrigger>
             <DropdownMenuContent className="w-56 ">
              {
                data && data.length > 0 ? 
                data.map((category:CategoryType) => 
                   (
                   <Link href={`/category/${category.id}`} key={category.id} className="">
                    <DropdownMenuItem className="text-sm  uppercase">
                      {category.name}
                    </DropdownMenuItem>
                    </Link>)) : <p className="text-sm p-2"> No categories</p>
                    }
                  
              
              
               
             </DropdownMenuContent>
           </DropdownMenu>
          
        
      </div>
      

        <SearchBar/>

        <div className="flex gap-3 items-center ">
           <Cart count={count()} />
           

          <div className="flex gap-3 items-center ">
            {isSignedIn ? (
              <div className=" ">
                  
                  <UserButton afterSignOutUrl='/'/>
              </div>)
             : (
              <div className="flex gap-3 items-center ">
                      <Link href='/sign-in'>
                        <Button className="text-white text-sm rounded-xl"> Login</Button>
                      </Link>
                      <Link href='/sign-up'>
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