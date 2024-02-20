import { prisma } from "@/lib/prisma";
import {NextResponse} from 'next/server'
import {UserType} from '@/lib/types'


export async function GET(req: Request, res: Response){
    const users = await prisma.user.findMany()
    if(!users) return NextResponse.json({message:'No users found'}, {status: 404})
    return NextResponse.json(users, {status: 200})

}

export async function  POST(req: Request, res: Response){
    const {name,email,externalId} = await req.json() as unknown as UserType
    const user = await prisma.user.upsert({
        create:{
            name,
            email,
            externalId
        },
        update:{
            name,
            email
        },
        where:{
            externalId
        }
        
    })
    return NextResponse.json(user, {status: 201})
}