import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import {Cart} from '@/lib/types'




export async function POST(req: Request) {
    const body = await req.json() as unknown as Cart ;
    const {userId, items}= body
    if(!userId) return NextResponse.json({message:'No user attached'}, {status: 400});
    if(!items || !Array.isArray(items) ) return NextResponse.json({message:'No items attached'}, {status: 400});
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if(!user) return NextResponse.json({message:'User not found'}, {status: 404});
    const totalPrice = items.reduce((acc:any, item:any) => acc + ((item.price) * item.quantity), 0)
    const newCart = await prisma.cart.create({
        data: {
            userId,
            totalPrice,
            items: {
                create: items
            },

            
        },
        include:{
                items:true,
        },
        })

    return NextResponse.json({message:' Cart succesfully created'}, {status: 201})   
}