// import { prisma } from "@/lib/prisma"
// import { NextResponse } from "next/server"
// import {CartType, CartItemType} from '@/lib/types'

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//     const userId = params.id as string
//     const carts = await prisma.cart.findFirst({
//       where: {
//         userId: userId // Assuming userId is a number, if it's a string, remove parseInt
//       }
//     });
//     if(!carts ) return NextResponse.json({message:'No carts found'})
//     return NextResponse.json(carts, {status: 200})
// }

// export async function POST(req: Request) {
//     const body = await req.json() as unknown as CartType ;
//     const {productId, quantity,userId} = body;
//     if(!productId || !quantity || !userId) return NextResponse.json({message:'Invalid params'}, {status: 400});
//     const product = await prisma.product.findUnique({
//         where: {
//             id: productId,
//         },
//     });
//     try {
//         const cart = await prisma.cart.create({
//             data: {
//                 userId,
//                 items:{
//                     create: product.map((productId: string) => ({
//                     product: {
//                         connect: {
//                         id: productId
//                         }
//                     }
//                     }))

//                 },
//                 quantity
//             },
//         });
//         return NextResponse.json(cart);
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Error creating cart' }, {status: 500});
//     }
// }