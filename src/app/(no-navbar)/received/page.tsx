import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex  flex-col w-screen h-screen justify-center items-center gap-3'>
        <p className='text-xl'>Your order has been received</p>
        <Link href='/'>
          <p className="text-center underline text-slate-600 py-2">Go back to home</p>
        </Link>

    </div>
  )
}

export default page