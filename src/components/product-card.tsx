'use client'

import { useCartStore } from "@/lib/cart";
import { formatNumber,truncateText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductType } from "@/lib/types";
import { parseImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {useUser} from '@clerk/nextjs'



export default function ProductCard({ id, name, price,description, imageUrl, brand, numberInStock, product}: any) {

  const router = useRouter()
  const {add: handleAddToCart} = useCartStore();
  const isNumberInStock = numberInStock > 0;
  const {user} = useUser()
  const userId = user?.id ? user.id : null;

  return (
    <div
    
    // className=" h-96 border p-3 rounded-xl border-slate-200 flex flex-col items-center bg-slate-50 transistion cursor-pointer hover:scale-105"
    >
      <div
      onClick={() => router.push(`/products/${id}`)}  
      className=" bg-slate-100 w-full h-[250px]   xl:w-[250px] xl:h-[300px] flex items-center justify-center rounded-md mb-2 transistion cursor-pointer hover:scale-105">
        {!numberInStock && (
          <div className="absolute bg-black bg-opacity-50 p-3 text-sm  rounded-md text-white ">Out of Stock</div>
        )}
        <Image src={parseImageUrl(imageUrl)} width={200} height={250} alt="coffee" className=" rounded-md" />
      </div>
      <h2 className="text-slate-400 font-bold ">{truncateText(name)}</h2>
      <h2 className="font-semibold text-green-400">$ {formatNumber(price)}</h2>
      <Button
      onClick={() => handleAddToCart(product,userId)} 
      className="mt-4 font-semibold text-sm text-white bg-black  rounded-md p-3  text-center w-full"
      >
        Add To Cart
      </Button>
    </div>
  )
}