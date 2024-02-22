import {  NextResponse} from "next/server";

import {  PaymentType } from "@/lib/types";
import { prisma } from "@/lib/prisma";



export async function GET(req:Request, { params }: { params: { id: string } }){
    const paymentId = params.id as string;
    if(!paymentId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const payment = await prisma.payment.findUnique({
        where: {
            id: paymentId,
        },
    });
    if(!payment) return NextResponse.json({message:'Payment not found'}, {status: 404});
    return NextResponse.json(payment, {status: 200});
}

export async function  DELETE(req:Request, { params }: { params: { id: string } }){
    const paymentId = params.id as string;
    if(!paymentId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const payment = await prisma.payment.delete({
        where: {
            id: paymentId,
        },
    });
    return NextResponse.json(payment, {status: 200});
}

export async function UPDATE(req:Request, { params }: { params: { id: string } }){
    const paymentId = params.id as string;
    if(!paymentId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const {status} = await req.json() as unknown as PaymentType;
    const payment = await prisma.payment.update({
        where: {
            id: paymentId,
        },
        data: {
            status,
        },
    });
    return NextResponse.json(payment, {status: 200});
}
