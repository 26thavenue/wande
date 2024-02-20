'use client'

import React,{useEffect,useState} from 'react'
import {getCategoryById} from "@/lib/data"
import { usePathname } from 'next/navigation' 
import {CategoryType} from '@/lib/types'

const page = () => {
  const [data,setData] =useState<CategoryType|null>(null)
  const pathname = usePathname()

  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  useEffect(()=>{
    getCategoryById(id).then(res=>setData(res)).catch(err=>console.log(err))
  },[])

  return (
    <div className='flex items-center justify-center flex-col mt-10 gap-6'>
        <h1 className="text-2xl font-semibold">{data?.name}</h1>
        <h2> Explore product in the {data?.name} category</h2>
    </div>
  )
}

export default page