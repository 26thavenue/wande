'use client'

import React, { useEffect, useState } from 'react';
import { getProductById } from "@/lib/data";
import Container from "@/components/Container";
import ProductDetails from "@/components/product-details";
import { usePathname } from 'next/navigation';
import {ProductType} from '@/lib/types'
import { PuffLoader } from "react-spinners";
import { useCartStore } from '@/lib/cart';
import { useUser } from '@clerk/nextjs';

const ProductPage = () => {
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const pathname = usePathname();
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  const {user} = useUser();
  const userID = user?.id ? user.id : ""

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return  <div className="h-screen flex justify-center items-center">

                 <PuffLoader color="#b6b6b6" className="mx-auto "/>
              </div>;
  }

  if (error || !product) {
    return <div>Error occurred while fetching product</div>;
  }

  return (
    <div className="p-8">
      <Container>
        {/* <h1 className="text-2xl font-semibold">{product?.name}</h1> */}
        <ProductDetails 
         product={product}
         userID={userID} />
         {/* <RelatedProducts id={id} /> */}
      </Container>
    </div>
  );
};

export default ProductPage;
