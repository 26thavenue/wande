'use client'
import {useEffect} from 'react'
import { SignUp } from "@clerk/nextjs";

import React from 'react'

const page = () => {
  return (
    <div className='my-10'>
      <SignUp />
    </div>
  )
}

export default page