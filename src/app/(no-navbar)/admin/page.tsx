import { UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
        <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default page