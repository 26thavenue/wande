import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import {CartItemType} from '@/lib/types'


export async function GET(req: Request, res: Response) {
  const cartItems = await prisma.cartItem.findMany()
  if(!cartItems || cartItems.length === 0) return NextResponse.json({message:'No cart items found'})
  NextResponse.json(cartItems, {status: 200})
}

export async function POST(req:Request,  { params }: { params: { id: string } }){
    const {productId, productName, price, quantity, imageUrl} = await req.json() as unknown as CartItemType;
    if(!productId || !productName || !price || !quantity || !imageUrl) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const cartItem = await prisma.cartItem.create({
        data: {
            productId,
            productName,
            price,
            quantity,
            imageUrl
        }
    });
    return NextResponse.json(cartItem, {status: 201});
}

