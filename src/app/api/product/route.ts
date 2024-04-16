'use server'
import {prisma} from '@/lib/prisma';

import {NextResponse,NextRequest} from 'next/server'


export async function GET(req: NextRequest) {
    const products = await prisma.product.findMany();
    if(!products) return NextResponse.json({message:'No products found'})
    return NextResponse.json(products, {status: 200})  
}



