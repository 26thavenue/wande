import {prisma} from'@/lib/prisma';
import {NextResponse} from 'next/server'

export async function GET(req: Request , { params }: { params: { id: string } }){
    const id = params.id as string
    const user = await prisma.user.findUnique({
        where:{
            externalId :id
        },
        include:{
            items:{
                include:{
                    product:true
                }
            }
        }
    })
    if(!user) return NextResponse.json({message:'No user found'}, {status: 404})
    // console.log(user)
    return NextResponse.json(user, {status: 200})
}

