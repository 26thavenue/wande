

import { cache } from "react";
import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Product } from "@prisma/client";


export const getAllProducts = async () => {
    const res = await prisma.product.findMany({
        orderBy:{
            price: 'asc',
        }
    });
    return res;
}



export const getOneProduct = cache(async(id:string) =>{
    const res = await prisma.product.findFirst(
        {
            where:{
                id
            }
        }
    );
    try {
        if(!res) {
          NextResponse.json("Product not found ", {status: 404})
        }
        
    } catch (error) {
        console.error(error)
        NextResponse.json("Server Error", {status: 500})
        
    }
    return res;
})

export const deleteProduct = cache(async(id:string) =>{
    
    const checkProductAvailability = getOneProduct(id);

    if(!checkProductAvailability) {
        NextResponse.json("Product not found ", {status: 404})
    }

    try{
        const res = await prisma.product.delete(
            {
                where:{
                    id
                }
            }
        );
    return res;
        
    }catch(error){
        console.error(error)
        NextResponse.json("Server Error", {status: 500})
    
    }


})

export const updateProduct = cache(async(id:string, data:Product) =>{
    const checkProductAvailability = getOneProduct(id);

    if(!checkProductAvailability) {
        NextResponse.json("Product not found ", {status: 404})
    }

    try{
        const res = await prisma.product.update(
            {
                where:{
                    id
                },
                data
            }
        );
    return res;
        
    }catch(error){
        console.error(error)
        NextResponse.json("Server Error", {status: 500})
    
    }

})
