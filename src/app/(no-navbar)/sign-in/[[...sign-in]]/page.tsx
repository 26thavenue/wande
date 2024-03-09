'use client'
import {useEffect} from 'react'
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter} from "next/navigation";
import { useCartStore } from "@/lib/cart";



export default function Page() {
  const {user, isSignedIn} = useUser();
  const {populateCart} = useCartStore();
  const router = useRouter();

  useEffect(() => {
    const PopulateCart = async () => {
      if (isSignedIn) {
        await populateCart(user);
      }
    };
    PopulateCart();
    
  }, [])
  return (
    <>
    {isSignedIn ? router.push('/dashboard') : 
    <>
      <div className="flex items-center justify-center ">
       <SignIn  />
    </div>  
    </>
    }
    
    </>
    
 
  )
}