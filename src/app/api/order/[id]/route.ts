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
    const {deliveryStatus, deliveryDate,status } = await req.json() 
    
    const user = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            user: {
                include:{
                    items:{
                        include:{
                            product:true
                        }
                    }
                }
            },
        },
    });
    console.log(user)
    // if(status.toUpperCase() == 'PAID'){
    //     await prisma.user
    // }
    const order = await prisma.order.update({
        data: {
            deliveryStatus,
            deliveryDate,
            status
        },
        where: {
            id: orderId,
        },
        include: {
                products: true, 
        },
    });
    return NextResponse.json(order, {status: 201});
}