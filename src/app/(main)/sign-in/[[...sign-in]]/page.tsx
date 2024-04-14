'use client'
import {useEffect} from 'react'
import { SignIn } from "@clerk/nextjs";

import React from 'react'

const page = () => {
  return (
    <div className='my-10'>
      <SignIn />
    </div>
  )
}

export default page