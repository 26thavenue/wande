'use server'

import {  NextResponse} from "next/server";

export async function GET(req: Request) {
    // const { user } = useUser();
    // const  {isSignedIn} = useAuth()

    // if(!user || !isSignedIn) {
    //     return res.status(401).json({message: 'Unauthorized'})
    // }

    // const orders = await prisma.order.findMany({
    //     where:{
    //         userId:user.id
    //     }
    // })
    
    return NextResponse.json('Heyy my gee')
     
}