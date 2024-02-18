import {prisma} from '@/lib/prisma';
import {ProductType, CategoryType} from '@/lib/types'
import {NextResponse} from 'next/server'


export async function GET(req: Request) {
    const categories = await prisma.category.findMany();
    if(!categories || categories.length === 0) return NextResponse.json({message:'No products found'})
    return NextResponse.json(categories, {status: 200})
}


export  async function POST(req:Request){
  const body = await req.json() as unknown as CategoryType ;
  const {name , products} = body;
    if(!name){
        return NextResponse.json({message:'Invalid params'})
    }
  const checkDuplicate = await prisma.category.findFirst({
        where:{
            name
        }
    })
    if(checkDuplicate){
        return NextResponse.json({message:'Category already exists'})
    }
    try {
        const category = await prisma.category.create({
            data: {
                name,
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating category' }, {status: 500});
    }
  
}

