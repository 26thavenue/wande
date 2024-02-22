import { CartItemType, UserType } from "@/lib/types";
import {prisma} from '@/lib/prisma';
import { NextResponse } from "next/server";

// export async function GET(req: Request){
//     const {id} = req.query as unknown as UserType;
//     const cart = await prisma.cartItem.findFirst({
//         where: {
//             userId
//         },
//         include:{
//             items:{
//                 include:{
//                     product:true
//                 }
//             }
//         }
//     });
//     if(!cart){
//         return NextResponse.json({message:'No cart found'}, {status: 404})
//     }
//     return NextResponse.json(cart, {status: 200})
// }


export async function POST(req: Request){
    const {productId, quantity, userId} = req.json() as unknown as CartItemType;

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    if(!product){
        return NextResponse.json({message:'Product not found'}, {status: 404})
    }

    const user = await prisma.user.findUnique({
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
    } catch (error) {
        return NextResponse.json({message:'Error creating cart item'}, {status: 500})
    }
   
}