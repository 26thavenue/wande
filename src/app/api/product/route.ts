'use server'

import {prisma} from '@/lib/prisma';
import {ProductType} from '@/lib/types'
import {NextResponse,NextRequest} from 'next/server'


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('query')
    if(query){
      const page = parseInt(query as string) || 1;
      const pageSize = 3;
      const skip = (page - 1) * pageSize;
      const products = await prisma.product.findMany({
        take: pageSize,
        skip,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
    });
      if(!products) return NextResponse.json({message:'No products found'})
      return NextResponse.json(products, {status: 200})
    }
    else
    {
        const products = await prisma.product.findMany();
        if(!products) return NextResponse.json({message:'No products found'})
        return NextResponse.json(products, {status: 200})
    }
   
    
}


export  async function POST(req:Request){
  const body = await req.json() as unknown  as ProductType  ;
  console.log(body.description);
  const {name, description, imageUrl, price, brand, numberInStock, categoryId, categoryName} = body;
  if(!name || !description || !imageUrl || !price || !brand ){
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
        categoryName
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating product' }, {status: 500});
  }
}

