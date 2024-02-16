import {prisma} from '@/lib/prisma';
import {ProductType, CategoryType} from '@/lib/types'
import {NextResponse} from 'next/server'

export async function PUT(req: Request , { params }: { params: { id: string } }) {
 const categoryId = params.id as string
 if(!categoryId) return NextResponse.json({message:'Invalid params'}, {status: 400});
//  console.log(categoryId);

  const {  id: productId} = await req.json() as unknown as  ProductType;
//   console.log(productId);
  if(!productId) return NextResponse.json({message:'Invalid params'}, {status: 400});
  const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if (!product) {
        return NextResponse.json({ message: 'Product not found' }, {status: 404});
    }
    // return NextResponse.json(product, {status: 200});
  try {
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        products: {
          connect: { id: productId },
        },
      },
      include: {
        products: true, 
      },
    });
    return NextResponse.json(updatedCategory,{status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error adding product to category' }, {status: 500});
  }
}

export async function GET(req:Request, { params }: { params: { id: string } }){
    const categoryId = params.id as string
    if(!categoryId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        },
    });

    if (!category) {
        return NextResponse.json({ message: 'Category not found' }, {status: 404});
    }
    return NextResponse.json(category, {status: 200});
}

export async function DELETE(req:Request, { params }: { params: { id: string } }){

    const categoryId = params.id as string
    if(!categoryId) return NextResponse.json({message:'Invalid params'}, {status: 400});
    try {
        const deletedProduct = await prisma.category.delete({
        where: {
            id: categoryId,
        },
        });
        return NextResponse.json(deletedProduct, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error deleting category' }, {status: 500});
    }
}

export async function changeCategoryName(req:Request, { params }: { params: { id: string } }){
    const categoryId = params.id as string
    if(!categoryId) return NextResponse.json({message:'Invalid params'}, {status: 400});

    const { name } = await req.json() as unknown as CategoryType;
    if(!name) return NextResponse.json({message:'Invalid params'}, {status: 400});
    try {
        const updatedCategory = await prisma.category.update({
        where: { id: categoryId },
        data: {
            name,
        },
        });
        return NextResponse.json(updatedCategory,{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error updating category' }, {status: 500});
    }
}