import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server'
import {CartItem} from '@/lib/types'

export async function GET(req:Request, { params }: { params: { id: string } }){
    const cartItemId = params.id as string
    if(!cartItemId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const cartItem = await prisma.cartItem.findUnique({
        where: {
            id: cartItemId,
        },
    });

    if (!cartItem) {
        return NextResponse.json({ message: 'CartItem not found' }, {status: 404});
    }
    return NextResponse.json(cartItem, {status: 200});
}

export async function DELETE(req:Request, { params }: { params: { id: string } }){
    const cartItemId = params.id as string
    if(!cartItemId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const cartItem = await prisma.cartItem.delete({
        where: {
            id: cartItemId,
        },
    });
    return NextResponse.json(cartItem, {status: 200});
}


export async function PUT(req: Request , { params }: { params: { id: string } }) {
    const cartItemId = params.id as string
    if(!cartItemId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const {  productId, quantity, orderId } = await req.json() as unknown as  CartItem;
    if(!productId ||  !quantity ) return NextResponse.json({message:'Invalid params'}, {status: 400});
    
    const cartItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: {
            productId,   
            quantity,
            orderId
        },
    });
    return NextResponse.json(cartItem,{status: 200});
}
