'use server'

import {  NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderType, CartItemType } from "@/lib/types";

export async function GET(req: Request) {
    const orders = await prisma.order.findMany();
    if(!orders || orders.length === 0) return NextResponse.json({message:'No orders found'}, {status: 404});
    return NextResponse.json(orders, {status: 200});
    
     
}

export async function POST(req: Request) {
    const { userId, amount, products, paymentId, address } = await req.json() as unknown as OrderType;
    if(!userId || !amount || !products || products.length === 0) return NextResponse.json({message:'Invalid params'}, {status: 400});
    
    //
    const order = await prisma.order.create({
        data: {
            userId,
            amount,
             products: {
                create: products,
            },         
            paymentId,
            address,
        },
        include: {
                products: true, 
        },
    });
    return NextResponse.json(order, {status: 201});
}