import {prisma} from '@/lib/prisma';
import {OrderType,ProductType, CartItemType} from '@/lib/types'
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


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const orderId = params.id as string;
  if (!orderId) return NextResponse.json({ message: 'Invalid params' }, { status: 400 });

  const { deliveryStatus, deliveryDate, status } = await req.json();

  // Get the order details, including the associated products
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { products: { include: { product: true } } },
  });

  if (!order) {
    return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  }

  // Prepare data for updating the products' numberInStock
  const productUpdates = order.products.map((orderProduct) => ({
    data: {
      numberInStock: { decrement: orderProduct.quantity },
    },
    where: {
      id: orderProduct.product.id,
    },
  }));

  // Update the order and the associated products' numberInStock
  if(status.toLowerCase() == 'paid'){
    const updatedOrder = await prisma.$transaction([
    prisma.order.update({
      data: { deliveryStatus, deliveryDate, status },
      where: { id: orderId },
      include: { products: { include: { product: true } } },
    }),
    ...productUpdates.map((update) =>
      prisma.product.update(update)
    ),
  ]);
  return NextResponse.json(updatedOrder, { status: 201 });
  }
  return NextResponse.json(order, { status: 201 });
  
}

