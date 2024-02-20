'use server'

import {prisma} from '@/lib/prisma';
import {ProductType} from '@/lib/types'
import {NextResponse,NextRequest} from 'next/server'


export async function GET(req: NextRequest) {
    const products = await prisma.product.findMany();
    if(!products) return NextResponse.json({message:'No products found'})
    return NextResponse.json(products, {status: 200})  
}


export  async function POST(req:Request){
  const body = await req.json() as unknown  as ProductType  ;
  // console.log(body.description);
  const {name, description, imageUrl, price, brand, numberInStock, categoryId} = body;
  if(!name || !description || !imageUrl || !price || !brand || !categoryId){
    return NextResponse.json({message:'Invalid params'})
  }
  const categoryExists = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });
  if (!categoryExists) {
    return NextResponse.json({message:'Invalid category'})
  }

  try {
    const product = await prisma.product.create({
      data: {
        description,
        imageUrl,
        name,
        price,
        brand,
        numberInStock,
        categoryId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating product' }, {status: 500});
  }
}

