import {prisma} from '@/lib/prisma';
import {ProductType} from '@/lib/types'
import {NextResponse,NextRequest} from 'next/server'


export async function GET(req: NextRequest, res:NextResponse) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('query')
  if(!query) return NextResponse.json({message:'No search query provided'}, {status: 400});
  try {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: query as string // Filter products by name containing the search query
        },
      },
    });

    return NextResponse.json(categories, {status: 200});
  } catch (error) {
    console.error('Error retrieving category:', error);
    NextResponse.json({ error: 'Error retrieving category' }, {status: 500});
  } 
}