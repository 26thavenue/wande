import {prisma} from '@/lib/prisma';
import {OrderType, CartItemType} from '@/lib/types'
import {NextResponse} from 'next/server'

export async function GET(req: Request,{ params }: { params: { id: string } }) {
    const orderId = params.id as string
    if(!orderId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });

    if (!order) {
        return NextResponse.json({ message: 'Order not found' }, {status: 404});
    }
    return NextResponse.json(order, {status: 200});

}

export async function DELETE(req: Request,{ params }: { params: { id: string } }){
    const orderId = params.id as string
    if(!orderId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const order = await prisma.order.delete({
        where: {
            id: orderId,
        },
    });
    return NextResponse.json(order, {status: 200});
}

export async function UPDATE(req: Request,{ params }: { params: { id: string } }){
    const orderId = params.id as string
    if(!orderId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const { userId, amount, products, paymentId, address } = await req.json() as unknown as OrderType;
    if(!userId || !amount || !products || products.length === 0) return NextResponse.json({message:'Invalid params'}, {status: 400});

    const {  id: cartItemId} = await req.json() as unknown as  CartItemType;
     const cartItem= await prisma.cartItem.findUnique({
        where: {
            id: cartItemId,
        },
    });
     if (!cartItem) {
        return NextResponse.json({ message: 'Cart Item  not found' }, {status: 404});
    }
    //
    const order = await prisma.order.create({
        data: {
            userId,
            amount,
             products: {
                connect: { id: cartItemId },
            },         
            paymentId,
            address,
        },
        include: {
                products: true, 
        },
    });
    return NextResponse.json(order, {status: 201});
}