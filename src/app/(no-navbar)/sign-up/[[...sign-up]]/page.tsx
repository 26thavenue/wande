import { SignUp } from "@clerk/nextjs";
 import { createUser } from "@/lib/data";
import { useEffect } from "react";
import {useUser} from '@clerk/nextjs'
import { useSignUp } from "@clerk/nextjs";
export default function Page() {
  const {user} = useUser()
  const name = user?.firstName
  const email = user?.emailAddresses[0]?.emailAddress
  const externalId = user?.id
  const { isLoaded, signUp } = useSignUp();
  useEffect(()=>{
    if(signUp){
      if(!name || !email || !externalId) return
      createUser({name,email,externalId})
    }
  },[signUp])
  return (
    <div className="flex items-center justify-center ">
       <SignUp  />

       
       
    </div>
 
  )
}
