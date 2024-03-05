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

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });
    if(!user){
        return NextResponse.json({message:'User not found'}, {status: 404})
    }
    try {

        let existingCartItem = await prisma.cartItem.findFirst({
            where: {
                productId: productId,
                userId: userId
            }
        });

         if (existingCartItem) {
            // If the cart item exists, update its quantity
            existingCartItem = await prisma.cartItem.update({
                where: {
                    id: existingCartItem.id
                },
                data: {
                    quantity: existingCartItem.quantity + quantity // Update quantity
                }
            });
            return NextResponse.json(existingCartItem, { status: 200 });
        }
        
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

// export async function POST(req: Request , { params, body }: { params: { id: string }, body: { cartItems: any[] } }){
//     const userId = params.id as string;
//     const { cartItems } = body;

//     // Update cart items in the database
//     const updatedCartItems = await Promise.all(cartItems.map(async (item) => {
//         const existingCartItem = await prisma.cartItem.findUnique({
//             where: {
//                 id: item.id // Assuming each cart item has a unique identifier
//             }
//         });
        
//         if (!existingCartItem) {
//             // Cart item doesn't exist, create a new one
//             return prisma.cartItem.create({
//                 data: {
//                     userId,
//                     productId: item.productId,
//                     quantity: item.quantity
//                 }
//             });
//         } else {
//             // Cart item exists, update quantity
//             return prisma.cartItem.update({
//                 where: {
//                     id: item.id
//                 },
//                 data: {
//                     quantity: item.quantity
//                 }
//             });
//         }
//     }));

//     // Return success response
//     return NextResponse.json({ success: true, updatedCartItems }, { status: 200 });
// }