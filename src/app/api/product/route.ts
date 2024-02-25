'use server'
import { writeFile } from 'fs/promises';
import fs from 'fs';
import {dirname,join} from 'path';
import {prisma} from '@/lib/prisma';
import {ProductType} from '@/lib/types'
import {NextResponse,NextRequest} from 'next/server'


export async function GET(req: NextRequest) {
    const products = await prisma.product.findMany();
    if(!products) return NextResponse.json({message:'No products found'})
    return NextResponse.json(products, {status: 200})  
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  brand: string;
  categoryId: string;
  image: File;
  numberInStock: number;
}

async function saveImage(image: File): Promise<string> {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const publicDirectory = join(process.cwd(), 'public');
  const path = join(publicDirectory, image.name);
  await writeFile(path, buffer);
  return path;
}

async function createProduct(data: ProductFormData) {
  const { name, description, price, brand, categoryId, image, numberInStock } = data;

  const categoryExists = await prisma.category.findFirst({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    throw new Error('Invalid category');
  }

  const imageUrl = await saveImage(image);

  const product = await prisma.product.create({
    data: {
      description,
      imageUrl,
      name,
      price,
      brand,
      numberInStock,
      categoryId,
      categoryName: categoryExists?.name,
    },
  });

  return product;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const formData = Object.fromEntries(body.entries()) as Record<string, unknown>;

    const { name, description,  brand, categoryId, image,  } = formData as unknown as  ProductFormData;
    let { price, numberInStock } = formData as unknown as  ProductFormData;
    price = Number(price);
    numberInStock = Number(numberInStock);

    if (!image) {
      return NextResponse.json({ message: 'Invalid file' });
    }

    if (!name || !description || !price || !brand || !categoryId) {
      return NextResponse.json({ message: 'Invalid params' });
    }

    const product = await createProduct({ name, description, price, brand, categoryId, image, numberInStock });

    return NextResponse.json('Product created successfully', { status: 201 });  
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}


