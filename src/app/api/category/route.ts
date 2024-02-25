import {prisma} from '@/lib/prisma';
import {ProductType, CategoryType} from '@/lib/types'
import {NextResponse} from 'next/server'
import toast from 'react-hot-toast';


export async function GET(req: Request) {
    const categories = await prisma.category.findMany(
        {         
            include: {
                products: true
            }
        }
    );
    if(!categories || categories.length === 0) return NextResponse.json({message:'No products found'})
    return NextResponse.json(categories, {status: 200})
}


export  async function POST(req:Request){
  const body = await req.json() as unknown as CategoryType ;
  const {name} = body;
    if(!name){
        return NextResponse.json({message:'Invalid params'})
    }
   const lowerCaseName = name.toLowerCase()
   const checkDuplicate = await prisma.category.findFirst({
        where:{
            name:lowerCaseName
        }
    })
    if(checkDuplicate){
        return NextResponse.json({message:'Category already exists'}, {status:400})
    }
    try {
        const category = await prisma.category.create({
            data: {
                name:lowerCaseName,
            }
        });
        return NextResponse.json({message:'Category succesfull created'}, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating category' }, {status: 500});
    }
  
}

