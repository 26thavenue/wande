
'use client'
import React, { useState, useEffect } from 'react';
import { getAllCategories, getAllProducts } from '@/lib/data';
import { CategoryType, ProductType } from '@/lib/types';
import ProductCard from '@/components/product-card';
import { PuffLoader } from "react-spinners";

const ExploreCategory = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      getAllProducts()
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          setError(true);
          console.error('Error fetching products:', error);
        });
    } else {
      const category = categories.find((cat) => cat.id === activeCategory);
      if (category) {
        setProducts(category.products || []);
      }
    }
  }, [activeCategory, categories]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const renderCategoryProducts = () => {
    if (products.length === 0) {
      return <div>No products found for this category.</div>;
    }
    return (
      <div className="text-sm pt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            description={product.description}
            numberInStock={product.numberInStock}
            categoryId={product.categoryId}
            categoryName={product.categoryName}
            image = {product.image}
            brand={product.brand}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className="my-16 uppercase text-center text-xl font-bold">Explore Category</h1>
      {loading ? (
        <div className="h-screen flex justify-center items-center">

                 <PuffLoader color="#b6b6b6" className="mx-auto "/>
              </div>
      ) : error ? (
        <div>Error occurred while fetching data</div>
      ) : (
        <div className="flex overflow-x-auto no-scrollbar  gap-4 uppercase cursor-pointer items-center justify-between">
          <div
            className={`cursor-pointer ${activeCategory === 'all' ? 'bg-black text-white' : ''}`}
            onClick={() => handleCategoryClick('all')}
          >
            <h1 className="hover:bg-[#b6b6b6]/10 p-2 transition">All</h1>
          </div>
          {categories && categories.length > 0 ? categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer ${activeCategory === category.id ? 'bg-black text-white' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <h1 className="hover:bg-[#b6b6b6]/10 p-2 transition">{category.name}</h1>
            </div>
          )): <p></p>}
        </div>
      )}
      {showSlider && (
        // Implement your slider component here
        <div className="slider">Slider Component</div>
      )}
      {renderCategoryProducts()}
    </div>
  );
};

export default ExploreCategory;
