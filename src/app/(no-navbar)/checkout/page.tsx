'use client'

import Container from '@/components/Container'
import React,{ useEffect,useState} from 'react'
import { useCartStore } from '@/lib/cart'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useAuth, useUser } from "@clerk/nextjs";

import Loading from './loading'

const page = () => {
  
  useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

//  productId, name, price, description, quantity, imageUrl, brand, category - cart
//  productId, cartItemId, quantity 
// 
// 
//     

  const { cart} = useCartStore();
  const [loading, setLoading] = useState(false)
  const [error, setError] =useState(false)
  const [userDetails, setUserDetails] = useState(null)
  
  const router = useRouter()
  
  const {isSignedIn} = useAuth()
  const { user} = useUser() ;
  
 
 
  
  
  if(user){
    // const  userId = user.id
    useEffect(() => {
    if(cart){
      setLoading(true)
      setError(false)
      // // console.log(cart);
      // fetch('/api/payment',{
      //       method:'POST',
      //       headers: { 'Content-Type':'application/json'},
      //       body:JSON.stringify({
      //           items:
      //           payment_id:null,
      //           userId:user.id
      //       })
            
      //   }).then((res) => {
      //       setLoading(false)
      //       if(res.ok){
      //           router.push('/success')
      //       }
      //       else if(res.status === 401){
      //           router.push('/login')
      //       }

      //       return res.json()
      //   }).catch((err) => {
      //       setError(true)
      //       setLoading(false)
      //       console.error(err)
      //       toast.error('An error occured')
      //   })
      
    }

  },[cart])
  }else{
    router.push('/sign-in')
  }
  
  return (
    <div>
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

export default page