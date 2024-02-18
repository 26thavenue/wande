"use server"
import {prisma} from '@/lib/prisma';
import {ProductType, CategoryType} from '@/lib/types'
import { NextResponse } from "next/server"

export async function PUT(req:Request, { params }: { params: { id: string } }){
  const productId = params.id as string;
  console.log(productId);
  if(!productId) return NextResponse.json({message:'Invalid params'}, {status: 400});
  const { description, imageUrl, name, price, brand, categoryId } = await req.json() as unknown as ProductType;
  const cat = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });
  if (!cat) {
   return NextResponse.json({message:'Category does not exist'}, {status: 400})
  }
   
   try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        description,
        imageUrl,
        name,
        price,
        brand,
        categoryId,
        categoryName:cat.name 
      },
    });
    return NextResponse.json(updatedProduct, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating product' }, {status: 500});
  }

}

 

export async function DELETE(req:Request, { params }: { params: { id: string } }){

    const productId = params.id as string;
    try {
        const deletedProduct = await prisma.product.delete({
        where: {
            id: productId,
        },
        });
        return NextResponse.json(deletedProduct, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error deleting product' }, {status: 500});
    }
    }

export async function GET(req:Request, { params }: { params: { id: string } }){
    const productId = params.id as string;
    
    if(!productId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if (!product) {
        return NextResponse.json({ message: 'Product not found' }, {status: 404});
    }
    return NextResponse.json(product, {status: 200});
}