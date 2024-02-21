import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import {CartItem} from '@/lib/types'


export async function GET(req: Request, res: Response) {
  const cartItems = await prisma.cartItem.findMany()
  if(!cartItems || cartItems.length === 0) return NextResponse.json({message:'No cart items found'})
  return NextResponse.json(cartItems, {status: 200})
}

export async function POST(req:Request,  { params }: { params: { id: string } }){
    const {productId, quantity} = await req.json() as unknown as CartItem;
    if(!productId || !quantity ) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const isProduct = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });
    if(!isProduct) return NextResponse.json({message:'Product not found'}, {status: 404});
    const cartItem = await prisma.cartItem.create({
        data: {
            productId,     
            quantity,
            
        },
        include: {
            product: true
        }
    });
    return NextResponse.json(cartItem, {status: 201});
}

