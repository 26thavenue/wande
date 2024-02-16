'use server'

import {  NextResponse} from "next/server";

import { Product } from "@/lib/cart";
import { prisma } from "@/lib/prisma";

const calculateTotalAmount = (items: Product[]):number=> {
    if(items){
        const total = items?.reduce((prev, curr) => prev + curr.price * curr.quantity,0 );
        return total
    }
    return 0
    
}





export async function POST(req: Request, res:Response) {

    const body = await req.json()
    const total = calculateTotalAmount(body.items)
    const orderData = {
        userId:body.userId,
        products:body.items,
        amount:total,  
        payment_id:body.payment_id   
    }

    const newOrder = await prisma.order.create({
            data:orderData
    
        })
    
    const newPaymentItem = await prisma.payment.create({
        data:{
            orderId:newOrder.id ,
            amount:total,
        }
    })     
    if(!body.payment_id){
        await Promise.all([
            prisma.order.update({
            where:{
                id:newOrder.id
            },
            data:{
                paymentId:newPaymentItem.id
            }
        })
        ]) 
    }
          
    return NextResponse.json({ message: `Your order with id:${newOrder.id} has been created`} )
        
        
    
    
}

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
    return NextResponse.json('Hi there')
}