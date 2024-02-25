// 'use client'
// import React from 'react';
// import { getAllCategories } from '@/lib/data';
// import { Separator } from '@/components/ui/separator';
// import { CategoryType, ProductType } from '@/lib/types';
// import ProductCard from '@/components/product-card'

// const ExploreCategory = () => {
//   const [data, setData] = React.useState<CategoryType[]>([]);
//   const [error, setError] = React.useState(false);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     getAllCategories()
//       .then((data) => {
//         setLoading(false); // Set loading to false when data is fetched
//         setData(data);
//       })
//       .catch((error) => {
//         setError(true);
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1 className="my-16  uppercase text-center text-xl font-bold">Explore Category</h1>
//       {/* <Separator className="mb-3" /> */}
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error occurred while fetching data</div>
//       ) : (
//         <div className="flex gap-4 uppercase cursor-pointer items-center justify-between">
//           {/* <h3 className='bg-black text-white p-2 rounded-md'>All</h3> */}
//           {data.map((category) => (
//             <div key={category.id} className="cursor-pointer">
//               <h1 className='hover:bg-[#b6b6b6]/10  p-2 transition'>{category.name}</h1>
//               <div className="flex gap-4">
//                 {category.products?.map((product) => (
//                   <ProductCard 
//                   id={product.id} 
//                   name={product.name}
//                   price={product.price}
//                   imageUrl={product.imageUrl}
//                   description={product.description}
//                   numberInStock={product.numberInStock}
//                   brand={product.brand}                 
//                    />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExploreCategory;

'use client'
import React, { useState, useEffect } from 'react';
import { getAllCategories, getAllProducts } from '@/lib/data';
import { CategoryType, ProductType } from '@/lib/types';
import ProductCard from '@/components/product-card';

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
      <div className="flex flex-wrap gap-4 mt-8">
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
        <div>Loading...</div>
      ) : error ? (
        <div>Error occurred while fetching data</div>
      ) : (
        <div className="flex gap-4 uppercase cursor-pointer items-center justify-between">
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
