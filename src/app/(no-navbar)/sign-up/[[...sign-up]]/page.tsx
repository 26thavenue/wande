import { SignUp } from "@clerk/nextjs";
import {useUser} from '@clerk/nextjs'
import { useRouter} from "next/navigation";


export default function page() {

  
  return (
  
      <div className="flex items-center justify-center ">
       <SignUp  />
    </div>  
   
   
  )
}
