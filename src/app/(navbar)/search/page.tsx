'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect,useState } from 'react'
import { getProductsBySearch } from '@/lib/data'
import { ProductType } from '@/lib/types';
import { SyncLoader } from "react-spinners";
import ProductCard from '@/components/product-card';
import Container from '@/components/Container';



const SearchPage = () => {
  const [data, setData] = useState<ProductType[]>([]);   
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams()
  const searchQuery = searchParams ? searchParams.get('q') : null

  const encodedSearch = encodeURI(searchQuery || '')

  useEffect(() => {
      if (encodedSearch) {
      setLoading(true);
      getProductsBySearch(encodedSearch as string)
        .then((products: ProductType[]) => {
          setData(products);
          setLoading(false);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    } else {
      setData([]);
    }
  }
    , [searchQuery])
  return (
    <div className='mt-6'>
        <Container>

             <p className='mt-3'>Showing results for <span className='font-bold'>{encodedSearch}</span></p>
            {loading  ? (
             <div className="h-screen flex justify-center items-center">

                 <SyncLoader color="#b6b6b6" className="mx-auto "/>
              </div>
          ) : 
          ( 
            <div className="text-sm pt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data ? data.slice(0, 20).map((product:ProductType) => 
                  <ProductCard key={product.id} 
                  id={product.id} 
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
              ): <p>No products available</p>}
            </div>
          )
          }
        </Container>

       
    </div>
  )
}

export default SearchPage