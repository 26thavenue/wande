'use server'

import {  NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderType} from "@/lib/types";

export async function GET(req: Request) {
    const orders = await prisma.order.findMany();
    if(!orders || orders.length === 0) return NextResponse.json({message:'No orders found'}, {status: 404});
    return NextResponse.json(orders, {status: 200});
    
     
}

export async function POST(req: Request) {
    const {userId, items, address, phoneNumber} = await req.json() as unknown as OrderType
    const total = items.reduce((acc:any, item:any) => acc + ((item.price) * item.quantity), 0)
    try{
        if(!userId || !items|| !address || !phoneNumber || !total) return NextResponse.json({message:'Please attach all the parameters'}, {status: 400});
        const order = await prisma.order.create({
            data: {
                userId,
                address,
                items: {
                    create: items
                },
                phoneNumber,
                total
            },
            include:{
                items:true
            }
        })

    return NextResponse.json({message:'Order succesfully created'}, {status: 201})
    }catch(err:any){
        return NextResponse.json({message:err.message}, {status: 500});
    }
    
}