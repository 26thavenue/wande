// import { prisma } from "@/lib/prisma";
// import {NextResponse} from 'next/server'
// import {UserType} from '@/lib/types'
// export async function GET(req: Request, res: Response){
//     const users = await prisma.user.findMany()
//     if(!users) return NextResponse.json({message:'No users found'}, {status: 404})
//     return NextResponse.json(users, {status: 200})

// }

// export async function  POST(req: Request, res: Response){
//     const {name,email,password} = req.body
//     const user = await prisma.user.create({
//         data:{
//             name,
//             email,
//             password
//         }
//     })
//     return NextResponse.json(user, {status: 201})
// }