import { NextApiRequest, NextApiResponse} from "next";
import { useAuth, useUser } from "@clerk/nextjs";
import { Product } from "@/lib/cart";
import { prisma } from "@/lib/prisma";

const calaculateTotalAmount = (items: Product[]):number=> {
    if(items){
        const total = items?.reduce((prev, curr) => prev + curr.price * curr.quantity,0 );
        return total
    }
    return 0
    
}

export async function POST(req: NextApiRequest, res:NextApiResponse) {
    const { user } = useUser();
    const  {isSignedIn} = useAuth()

    if(!user || !isSignedIn) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const body = await req.body
    const [items,  payment_id] = body
    const total = calaculateTotalAmount(items)
    const orderData = {
        userId:user.id,
        products:items,
        amount:total,
        status:'pending',
           
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
    if(!payment_id){
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
          
    return res.json(`Your order with id:${newOrder.id} has been created` )
        
        
    
    
}