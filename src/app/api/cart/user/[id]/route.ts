import {prisma} from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function GET(req: Request , { params }: { params: { id: string } }){
    const userId = params.id as string
    const cartItems = await prisma.cartItem.findMany({
    where: {
        userId: userId
    },
    include: {
        product: true
    }
});

const updatedCartItems = cartItems.map(cartItem => {
    const updatedPrice = cartItem.product.price;
    return { ...cartItem, price: updatedPrice };
});

return NextResponse.json({cartItems}, {status: 200});

}