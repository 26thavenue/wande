'use server'

import {  NextResponse} from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderType} from "@/lib/types";

export async function GET(req: Request) {
    const orders = await prisma.order.findMany();
    if(!orders || orders.length === 0) return NextResponse.json({message:'No orders found'}, {status: 404});
    return NextResponse.json(orders, {status: 200});
    
     
}

// export async function POST(req: Request) {
//     const {userId, items, address, phoneNumber} = await req.json() as unknown as OrderType
//     const user = await prisma.user.findFirst({
//         where: {
//             id: userId
//         }
//     });
//     if(!user){
//         return NextResponse.json({message:'User not found'}, {status: 404});
//     }
//     const invalidItems = items.filter((item: any) => item.userId !== userId);
//     if (invalidItems.length > 0) {
//         return NextResponse.json({ message: 'All items must have the same userId' }, { status: 400 });
//     }
//     const total = items.reduce((acc:any, item:any) => acc + ((item.price) * item.quantity), 0)
//     try{
//         if(!userId || !items|| !address || !phoneNumber || !total) return NextResponse.json({message:'Please attach all the parameters'}, {status: 400});
//         const order = await prisma.order.create({
//             data: {
//                 user:{
//                     connect:{
//                         id: userId
//                     }
//                 },
//                 address,
//                 items: {
//                     create: items.map((item) => ({
//                         product: {
//                         connect: { id: item.productId }, // Connect each item to the corresponding product
//                         },
//                         quantity: item.quantity,
//                         price: item.price,
//                         user: { connect: { id: userId } },
//                     })),
//                     },
//                 phoneNumber,
//                 total
//             },
//             include:{
//                 items:true
//             }
//         })

//     return NextResponse.json({message:'Order succesfully created'}, {status: 201})
//     }catch(err:any){
//         return NextResponse.json({message:err.message}, {status: 500});
//     }
    
// }

export async function POST (req:Request){
    return await prisma.$transaction(async (prisma) => {
        const {userId, address, phoneNumber} = await req.json() 
        const cartItems = await prisma.cartItem.findMany({
            where:{
                userId: userId
            },
            include:{
                product:true
            }
        });

        if(cartItems.length === 0) return NextResponse.json({message:'No items found in the cart'}, {status: 404});
         const total = cartItems.reduce((prev, current) => {
            return prev + (current.quantity * +current.product.price)
        }, 0);
        const order = await prisma.order.create({ 
            data: {
                userId,
                address,
                products: {
                    create: cartItems.map((item) => {
                         return {
                            productId: item.productId,
                            quantity: item.quantity
                        }
                    }),
                },
                phoneNumber,
                total
            },
        })

        await prisma.cartItem.deleteMany({
        where: {
            userId: userId
        }
    })
        return NextResponse.json({message:'Order succesfully created'}, {status: 201})  
    })
    
}