'use client'

import React, { useState, useEffect } from 'react';
import { getPaginatedProducts } from '@/lib/data';
import { ProductType } from '@/lib/types';
import ProductCard from '@/components/product-card'
import { PuffLoader } from "react-spinners";



const PAGE_LIMIT = 5; 

export default function CustomPagination() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: number) => {
    try {
      const data = await getPaginatedProducts(page);
      console.log(data);
      setProducts(data);
      setTotalPages(Math.ceil(data.totalCount / PAGE_LIMIT));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <div className=" mt-8 grid grid-cols-2 lg;grid-cols-4 xl:grid-cols-4 gap-4">
        
        {loading ? (
           <div className="h-screen flex justify-center items-center">

                 <PuffLoader color="#b6b6b6" className="mx-auto "/>
              </div>
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
                    key={product.id} 
                    name={product.name} 
                    price={product.price}
                    description={product.description}
                    numberInStock={product.numberInStock}
                    categoryId={product.categoryId}
                    categoryName={product.categoryName}
                    image = {product.image}
                    imageUrl={product.imageUrl}
                    brand={product.brand}
                    product={product}
                />
          ))
        ) : (
          <p className="p-6">No products</p>
        )}
      </div>
      <div className="mt-4 flex justify-center">{renderPagination()}</div>
    </div>
  );
}
