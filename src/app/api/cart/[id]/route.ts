import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { CartItemType} from '@/lib/types'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const cartItemId = params.id as string
    if(!cartItemId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    try {
        const cart = await prisma.cartItem.delete({
            where: {
                id: cartItemId,
            },
        });
        return NextResponse.json(cart, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error deleting cart' }, {status: 500});
    }
}

export async function  PUT(req: Request, { params }: { params: { id: string } }) {
    const cartItemId = params.id as string
    const {quantity} = await req.json() 
    console.log({cartItemId,quantity})
    if(!cartItemId || !quantity) return NextResponse.json({message:'Invalid request in the api'}, {status: 400});
    const product = await prisma.cartItem.findUnique({
        where: {
            id: cartItemId
        },
        include:{
            product:true
        }
    });
    if(!product) return NextResponse.json({message:'Product not found'}, {status: 404});
    if(product?.product.numberInStock < quantity) return NextResponse.json({message:'Not enough stock'}, {status: 400});
    try {
        const cart = await prisma.cartItem.update({
            where: {
                id: cartItemId,
            },
            data: {
                quantity
            },
        });
        return NextResponse.json(cart, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error updating cart' }, {status: 500});
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const userId = params.id as string
    const carts = await prisma.cartItem.findFirst({
      where: {
        userId: userId // Assuming userId is a number, if it's a string, remove parseInt
      }
    });
    if(!carts ) return NextResponse.json({message:'No carts found'})
    return NextResponse.json(carts, {status: 200})
}

