import React from 'react'
import {Product} from '@prisma/client'
import Image from 'next/image'
import { formatNumber } from "@/lib/utils"
import { Button } from '@/components/ui/button'



interface ProductCardProps {
  product: Product
}


const ProductCard:React.FC<ProductCardProps> = ({product}) => {

  return (
    <div>
        <div className=" rounded-md flex flex-col space-y-2 shadow-[0_1px_4px_rgba(0,0,0,0.16)] hover:shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] w-[180px] lg:w-[250px] font-satoshi p-4">
            <img src={product.imageUrl} alt={product.name} className='mx-auto cursor-pointer  hover:scale-105 h-[150px] w-[100px] lg:h-[200px] lg:w-[180px] object-contain' />
            <h3 className="text-lg ">{product.name}</h3>
            <p className="text-sm font-bold ">{formatNumber(product.price)}</p>
            <p className="text-sm">{product.brand}</p>
            <Button>Add To Cart</Button>
            
        </div>
    </div>
  )
}

export default ProductCard

