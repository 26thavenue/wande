'use client'

import React from 'react'
import Banner from '@/components/Banner'
import FeaturedProducts from '@/components/featured-products'
import Container from '@/components/Container'
import ExploreCategory from '@/components/exploreCategory'
import Discount from '@/components/Discount'
import { useEffect } from "react";
import {useUser} from '@clerk/nextjs'
import { useSignUp } from "@clerk/nextjs";
import { createUser } from "@/lib/data";
import { useCartStore } from '@/lib/cart'
import Newest from '@/components/New'
import Start from '@/components/start'
const page = () => {
  const {user} = useUser()
  const firstName = user?.firstName as string
  const lastName = user?.lastName
  const name =  firstName + " " + lastName
  const email = user?.emailAddresses[0]?.emailAddress
  const externalId = user?.id
  useEffect(()=>{
    if(user){
      if(!name || !email || !externalId) return
      createUser({name,email,externalId})
    }
   
    return 
  },[])
  return (
    <div>
      <Container>
        <Banner/>
        <div className="">
          <FeaturedProducts />
          <ExploreCategory />
          <Discount />
          <Newest/>
          <Start/>
        </div>
        
      
      </Container>
        
      
    </div>
  )
}

export default page