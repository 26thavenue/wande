'use client'

import { useCartStore } from "@/lib/cart";
import { formatNumber,truncateText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductType } from "@/lib/types";
import { parseImageUrl } from "@/lib/utils";


interface ProductCardProps extends ProductType  {
  
}



export default function ProductCard({ id, name, price,description, imageUrl, brand}: ProductCardProps) {

  const router = useRouter()
  const {add: handleAddToCart} = useCartStore();

  return (
    <div
    onClick={() => router.push(`/products/${id}`)} 
    className=" h-96 border p-3 rounded-xl border-slate-200 flex flex-col items-center bg-slate-50 transistion cursor-pointer hover:scale-105">
      <div className=" w-full flex items-center justify-center rounded-md mb-2">
        <Image src={parseImageUrl(imageUrl)} width={200} height={200} alt="coffee" className=" rounded object-cover " />
      </div>
      <h2 className="text-slate-400 font-bold ">{name}</h2>
      <h2 className="font-semibold text-green-400">$ {formatNumber(price)}</h2>
      <button
      // onClick={() => handleAddToCart(product)} 
      className="mt-4 font-semibold text-sm text-white bg-black  rounded-md py-2 text-center w-full">
        Add To Cart
      </button>
    </div>
  )
}