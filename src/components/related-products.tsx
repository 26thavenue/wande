// 'use client'

// import React from 'react';
// import { Separator } from './ui/separator';
// import { ProductType } from '@/lib/types';
// import { getAllProducts, getCategoryById } from '@/lib/data';
// import ProductCard from '@/components/product-card';
// interface RelatedProductProps {
//   id: string;
// }

// const RelatedProducts: React.FC<RelatedProductProps> = ({ id }) => {
//   const [relatedProducts, setRelatedProducts] = React.useState<ProductType[]>([]);

//   React.useEffect(() => {
//     const fetchRelatedProducts = async () => {
//       try {
//         const products = await getAllProducts();
//         const product = products.find((product:ProductType) => product.id === id);
//         if (product) {
//           const category = await getCategoryById(product.categoryId);
//           const filteredProducts = products.filter((p:any) => p.categoryId === category.id && p.id !== id);
//           setRelatedProducts(filteredProducts);
//         }
//       } catch (error) {
//         console.error('Error fetching related products:', error);
//       }
//     };

//     fetchRelatedProducts();
//   }, [id]);

//   if (relatedProducts.length === 0) {
//     return null; // Don't render anything if no related products found
//   }

//   return (
//     <div className="w-full">
//       <p className="text-lg p-6">RELATED PRODUCTS</p>
//       <Separator orientation="horizontal" className="w-full" />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
//         {relatedProducts.map((product) => (
//           <ProductCard
        
//             id={product.id}
//             name={product.name}
//             price={product.price}
//             imageUrl={product.imageUrl}
//             description={product.description}
//             numberInStock={product.numberInStock}
//             brand={product.brand}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;
