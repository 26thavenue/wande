import { CartItemType, UserType } from "@/lib/types";
import {prisma} from '@/lib/prisma';
import { NextResponse } from "next/server";



export async function GET(req: Request){
    const cartItems = await prisma.cartItem.findMany({
        include: {
            product: true,
            user: true
        }
    });
    return NextResponse.json(cartItems, {status: 200});
}


export async function POST(req: Request){
    const {productId, quantity, userId} = await req.json();
    if(!productId || !quantity || !userId){
        return NextResponse.json({message:'Invalid request'}, {status: 400})
    }

    const product = await prisma.product.findFirst({
        where: {
            id: productId
        }
    });

    if(!product){
        return NextResponse.json({message:'Product not found'}, {status: 404})
    }

    const price =  product.price;
    // console.log(price);

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });
    if(!user){
        return NextResponse.json({message:'User not found'}, {status: 404})
    }
    try {
        const newCartItem = await prisma.cartItem.create({
        data: {
            quantity,
            price,
            product:{
                connect:{
                    id: productId
                }
            },
            user:{
                connect:{
                    id: userId
                }
            }
        }
    })
    
    return NextResponse.json(newCartItem, {status: 201});
    } catch (error:any) {
        return NextResponse.json({message: error.message as unknown as  string}, {status: 500})
    }
   
}