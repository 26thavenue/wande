import { NextApiRequest, NextApiResponse} from "next";
import { useAuth, useUser } from "@clerk/nextjs";
import { Product } from "@/lib/cart";

const calaculateTotalAmount = (items: Product[]) => {

}

export async function PostPayment(req: Request, res:NextApiResponse) {
    const { user } = useUser();
    const  {isSignedIn} = useAuth()

    if(!isSignedIn) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const body = await req.json()
    const [items, payment_id] = body
    const total = calaculateTotalAmount(items)
    const orderData = {
        user,
        items,
        amount:total,
        deliverySttus:'pending',
        payment_id,
        products:items
    }
    if(payment_id){

    }else{
        // const payment_id = await 
    }
    
}