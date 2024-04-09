
'use client'
import React, { useState, useEffect } from 'react';
// import { getAllCategories, getAllProducts } from '@/lib/data';
// import { CategoryType, ProductType } from '@/lib/types';
// import ProductCard from '@/components/product-card';
import { Skeleton } from "@/components/ui/skeleton"
import { Loader } from "lucide-react";

const ExploreCategory = () => {
//   const [categories, setCategories] = useState<CategoryType[]>([]);
//   const [activeCategory, setActiveCategory] = useState<string>('all');
//   const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

//   useEffect(() => {
//     getAllCategories()
//       .then((data) => {
//         setCategories(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(true);
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (activeCategory === 'all') {
//       getAllProducts()
//         .then((data) => {
//           setProducts(data);
//         })
//         .catch((error) => {
//           setError(true);
//           console.error('Error fetching products:', error);
//         });
//     } else {
//       const category = categories.find((cat) => cat.id === activeCategory);
//       if (category) {
//         setProducts(category.products || []);
//       }
//     }
//   }, [activeCategory, categories]);

//   const handleCategoryClick = (categoryId: string) => {
//     setActiveCategory(categoryId);
//   };

//   const renderCategoryProducts = () => {
//     if (products.length === 0) {
//       return <div>No products found for this category.</div>;
//     }
//     return (
//       <div className="text-sm pt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             id={product.id}
//             name={product.name}
//             price={product.price}
//             imageUrl={product.imageUrl}
//             description={product.description}
//             numberInStock={product.numberInStock}
//             categoryId={product.categoryId}
//             categoryName={product.categoryName}
//             image = {product.image}
//             brand={product.brand}
//           />
//         ))}
//       </div>
//     );
//   };

  return (
    <div>
      <h1 className="my-16 uppercase  text-center text-xl font-bold font-jetBrains">Explore Category</h1>
      {loading &&(
             <div className="grid items-center  grid-cols-2 lg:grid-cols-3 space-x-4 gap-6  mt-4 ">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>


          </div>
              
        ) }

    </div>
  );
};

export default ExploreCategory;