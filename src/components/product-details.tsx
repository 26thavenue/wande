"use client"

import React, { useEffect, useState } from 'react';
import { getCategoryById } from '@/lib/data';
import { ProductType, CategoryType } from '@/lib/types';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import Image from 'next/image';
import { useCartStore } from '@/lib/cart';

import QuantityButton from './quantity-button';

interface ProductDetailsProps {
  product: ProductType;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { add: handleAddToCart } = useCartStore();
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryData = await getCategoryById(product.categoryId);
        setCategoryName(categoryData.name);
      } catch (error) {
        console.error('Error fetching category:', error);
        setCategoryName('');
      }
    };

    fetchCategoryName();
  }, [product.categoryId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <Image src='/socket.jpg' alt={product.name} width={500} height={500} />
      <div className="flex flex-col gap-1 text-slate-500">
        <h1 className="text-3xl font-medium text-slate-600">{product.name}</h1>
        <h1 className="text-2xl font-medium text-black mt-2">${product.price}</h1>
        <Separator orientation="horizontal" className="my-3" />
        <h1 className="text-justify">{product.description}</h1>
        <Separator orientation="horizontal" className="my-3" />
        <div className="flex gap-2">
          <h3>Quantity: </h3>
          {/* <QuantityButton product={product} /> */}
        </div>
        <h3>Category: {categoryName}</h3>
        <h3>Brand: {product.brand}</h3>
        {product.numberInStock > 1 ? (
          <Button 
          // onClick={() => handleAddToCart(product)} 
          className="my-3">
            Add to Cart
          </Button>
        ) : (
          <Button disabled className="my-3">
            Out of Stock
          </Button>
        )}
      </div>
      
    </div>
  );
};

export default ProductDetails;
