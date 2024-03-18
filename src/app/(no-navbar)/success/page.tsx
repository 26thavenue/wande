import Container from "@/components/Container";
import { BadgeCheck, MoveLeft } from "lucide-react";
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>
        <Container>
            <div className="flex flex-col h-screen items-center justify-center ">
                <BadgeCheck  className="w-48 h-48 text-green-600 animate-bounce "/>
                <p className="text-4xl font-bold">Success</p>
                <Link href='/' className='cursor-pointer text-center flex items-center gap-3 mx-auto'>
                  <MoveLeft />
                   <p className='text-sm text-[rgb(146,145,145)] hover:underline transistion'>Go back to shopping</p>
                </Link>
            </div>
        </Container>
    </div>
  )
}

export default Page