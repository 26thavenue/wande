'use client'

import Container from '@/components/Container'
import React,{ useEffect,useState} from 'react'
import { useCartStore } from '@/lib/cart'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useAuth, useUser } from "@clerk/nextjs";
import { Suspense } from 'react'


const page = () => {
  const { count ,cart} = useCartStore();
  const [loading, setLoading] = useState(false)
  const [error, setError] =useState(false)
  const [userDetails, setUserDetails] = useState(null)
  
  const router = useRouter()
  
  const {isSignedIn} = useAuth()
  const { user } = useUser();

 
  
  console.log(count);
  if(isSignedIn){
    // const  userId = user.id
    useEffect(() => {
    if(cart){
      setLoading(true)
      setError(false)
      // console.log(cart);
    //   fetch('/api/payment',{
    //         method:'POST',
    //         headers: { 'Content-Type':'application/json'},
    //         body:JSON.stringify({
    //             items:cart
    //         })
            
    //     }).then((res) => {
    //         setLoading(false)
    //         if(res.ok){
    //             router.push('/success')
    //         }
    //         else if(res.status === 401){
    //             router.push('/login')
    //         }

    //         return res.json()
    //     }).catch((err) => {
    //         setError(true)
    //         setLoading(false)
    //         console.error(err)
    //         toast.error('An error occured')
    //     })
      
    }

  },[cart])
  }else{
    router.push('/sign-in')
  }
  
  return (
    <div>
        <Container>
          
            {/* <div className='mx-auto mt-12'>
                {cart.length == 0 ? 
                <Button
                 >CHECKOUT</Button>: (
                <div>
                    <p>No items in your cart</p>
                </div>)}
            </div> */}
            <div className="flex flex-col gap-6 mb-3">
          {cart.length 
            ? cart.map((item, index) => 
            <div key={item.id} className="flex items-center justify-between gap-2">
              {/* <Image alt='cartItem' src={item.imageUrl} width={150} height={150}/> */}
              <div className="flex flex-col gap-1 justify-start  items-center">
                <p>{item.name}</p>
                <p className="text-right">${item.price}</p>
                <p className="text-center justify-self-start">{item.quantity}</p>
                <p className="text-center">
                 
                </p>
              </div>
              
            </div>)
            : <div><p  className="text-center text-slate-600 py-2">No Data</p></div>
          }
          {/* <p> SUBTOTAL : <span> ${subTotal}</span> </p> */}
        </div>
          
        </Container>
    </div>
  )
}

export default page