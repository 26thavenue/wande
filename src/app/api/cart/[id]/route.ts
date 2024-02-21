import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import {CartType, CartItemType} from '@/lib/types'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const cartId = params.id as string
    if(!cartId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    try {
        const cart = await prisma.cart.delete({
            where: {
                id: cartId,
            },
        });
        return NextResponse.json(cart, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error deleting cart' }, {status: 500});
    }
}
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const userId = params.id as string
    const carts = await prisma.cart.findFirst({
      where: {
        userId: userId // Assuming userId is a number, if it's a string, remove parseInt
      }
    });
    if(!carts ) return NextResponse.json({message:'No carts found'})
    return NextResponse.json(carts, {status: 200})
}

export async function UPDATE(req:Request,{ params }: { params: { id: string } } ){
    const cartId = params.id as string
    if(!cartId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const body = await req.json() as unknown as CartType ;
    const {userId, items, totalPrice} = body;
    try {
        const cart = await prisma.cart.update({
            where: { id: cartId },
            data: {
                userId,
                items: {
                    create: items
                },
                totalPrice
            },
        });
        return NextResponse.json(cart, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error updating cart' }, {status: 500});
    }
}