import {prisma} from '@/lib/prisma';
import {ProductType} from '@/lib/types'
import {NextResponse,NextRequest} from 'next/server'

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('limit')
    
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