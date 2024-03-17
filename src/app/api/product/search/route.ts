import {prisma} from '@/lib/prisma';
import {ProductType} from '@/lib/types'
import {NextResponse,NextRequest} from 'next/server'


export async function GET(req: NextRequest, res:NextResponse) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('query')
  if(!query) return NextResponse.json({message:'No search query provided'}, {status: 400});
  try {
    const products = await prisma.product.findMany({
      where: {
        OR:[
          {
            name:{
              contains:query,
              mode:'insensitive'
            }
          },
          {
            category:{
              name:{
                contains:query,
                mode:'insensitive'
              }
            }
          }
        ]
      },
    });

    return NextResponse.json(products, {status: 200});
  } catch (error) {
    console.error('Error retrieving products:', error);
    NextResponse.json({ error: 'Error retrieving products' }, {status: 500});
  } 
}