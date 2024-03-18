'use client'

import Container from '@/components/Container'
import React,{ useEffect,useState} from 'react'
import { useCartStore } from '@/lib/cart'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useAuth, useUser } from "@clerk/nextjs";
import { PuffLoader } from "react-spinners";


const Page = () => {
  
  useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);    

  const { cart} = useCartStore();
  const [loading, setLoading] = useState(false)
  const [error, setError] =useState(false)
  
  const router = useRouter()
  
  
  const { user} = useUser() ;
  
 
 
  
  
  if(user){
    // const  userId = user.id
    useEffect(() => {
    if(cart){
      setLoading(true)
      setError(false)
     
    }

  },[cart])
  }else{
    router.push('/sign-in')
  }
  
  return (
    <div>
      {loading &&  <div className="h-screen flex justify-center items-center">

                 <PuffLoader color="#b6b6b6" className="mx-auto "/>
              </div>}
        <Container>
          
            <div className='mx-auto mt-12'>
                {cart ? 
                <Button
                 >CHECKOUT</Button>: (
                <div>
                    <p>No items in your cart</p>
                </div>)}
            </div>
           
          
        </Container>
    </div>
  )
}

export default Page