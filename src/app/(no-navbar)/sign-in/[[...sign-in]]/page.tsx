'use client'
import {useEffect} from 'react'
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter} from "next/navigation";
import { useCartStore } from "@/lib/cart";



export default function page() {


  return (
   
      <div className="flex items-center justify-center ">
       <SignIn  />
    </div>  
 
  )
}