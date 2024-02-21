'use server'

import {  NextResponse} from "next/server";

import {  PaymentType } from "@/lib/types";
import { prisma } from "@/lib/prisma";


export async function GET(req:Request){
    const payments = await prisma.payment.findMany();
    if(!payments || payments.length === 0) return NextResponse.json({message:'No payments found'}, {status: 404});
    return NextResponse.json(payments, {status: 200});

}


export async function POST(req: Request) {
  const {orderId, amount } = await req.json() as unknown as PaymentType;
  if(!orderId || !amount ) return NextResponse.json({message:'Invalid params'}, {status: 400});
  const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });
  if(!order) return NextResponse.json({message:'Order not found'}, {status: 404});
  
    try{
        const payment = await prisma.payment.create({
            data:{
                amount,
                order:{
                    connect:{
                        id: orderId
                    }
                }
            }
        });
        return NextResponse.json(payment, {status: 201});
    }catch(err) {
        return NextResponse.json({message:'An error occured'}, {status: 500});
    }

    
        
    
    
}

