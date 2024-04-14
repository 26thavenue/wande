import { cache } from "react";
import {prisma} from "@/lib/prisma";


export  const getAllProducts = cache(async () => {
    const res = await prisma.product.findMany();
    return res;
})
