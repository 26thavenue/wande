'use client'

import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter} from "next/navigation";
export default function Page() {
  const {user, isSignedIn} = useUser();
  const router = useRouter();
  return (
    <>
    {isSignedIn ? router.push('/dashboard') : 
    <>
      <div className="flex items-center justify-center ">
       <SignIn  />
    </div>  
    </>
    }
    
    </>
    
 
  )
}