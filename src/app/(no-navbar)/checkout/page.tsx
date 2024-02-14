'use client'

import Container from '@/components/Container'
import React,{ useEffect,useState} from 'react'
import { useCartStore } from '@/lib/cart'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


const page = () => {
  const {cart} = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] =useState(false)
  const router = useRouter()

  useEffect(() => {
    if(cart){
      setLoading(true)
      setError(false)
        fetch('/api/payment',{
            method:'POST',
            headers: { 'Content-Type':'application/json'},
            body:JSON.stringify({
                items:[...cart, {total:useCartStore.getState().totalPrice(cart)}]
            })
            
        }).then((res) => {
            setLoading(false)
            if(res.ok){
                router.push('/success')
            }
            else if(res.status === 401){
                router.push('/login')
            }

            return res.json()
        }).catch((err) => {
            setError(true)
            setLoading(false)
            console.error(err)
            toast.error('An error occured')
        })
    }

  },[cart])
  return (
    <div>
        <Container>
            <div>
                {cart ? 'wow': (
                <div>
                    <p>No items in your cart</p>
                </div>)}
            </div>
        </Container>
    </div>
  )
}

export default page