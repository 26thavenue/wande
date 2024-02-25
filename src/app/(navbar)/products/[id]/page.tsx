'use client'

import React, { useEffect, useState } from 'react';
import { getProductById } from "@/lib/data";
import Container from "@/components/Container";
import ProductDetails from "@/components/product-details";
import { usePathname } from 'next/navigation';
import {ProductType} from '@/lib/types'
// import RelatedProducts from '@/components/related-products';

const ProductPage = () => {
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const pathname = usePathname();
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

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
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return <div>Error occurred while fetching product</div>;
  }

  return (
    <div className="p-8">
      <Container>
        {/* <h1 className="text-2xl font-semibold">{product?.name}</h1> */}
        <ProductDetails 
         product={product} />
         {/* <RelatedProducts id={id} /> */}
      </Container>
    </div>
  );
};

export default ProductPage;
