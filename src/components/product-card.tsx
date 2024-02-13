'use client'

import { useCartStore } from "@/lib/cart";
import { formatNumber,truncateText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/cart";
import Image from "next/image";


interface ProductCardProps  {
  id: number,
  name: string
  price: number,
  description:string,
  imageUrl:string,
  quantity:number
}

interface ProductType{
  product:Product
}


export default function ProductCard({ id, name, price,description, imageUrl, quantity }: ProductCardProps) {

  const router = useRouter()
  const {add: handleAddToCart} = useCartStore();
  const product = {id, name, price,description,imageUrl,quantity} as Product;

  return (
    <div
    onClick={() => router.push(`/products/${id}`)} 
    className="border p-3 rounded-xl border-slate-200 bg-slate-50 transistion cursor-pointer hover:scale-105">
      <div className="bg-gray-300 rounded-md mb-2">
        <Image src={product.imageUrl} width={180} height={180} alt="coffee" className="w-[180px] h-[180px] rounded object-cover" />
      </div>
      <h2 className="text-slate-400 font-bold ">{name}</h2>
      <h3>{description}</h3>
      <h2 className="font-semibold text-green-400">$ {formatNumber(price)}</h2>
      <button
      onClick={() => handleAddToCart(product)} 
      className="mt-4 font-semibold text-sm text-white bg-black  rounded-md py-2 text-center w-full">
        Add To Cart
      </button>
    </div>
  )
}