'use client'
 
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { getProductsBySearch } from '@/lib/data';
import { ProductType } from '@/lib/types';

export default function SearchBar() {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  useEffect(() => {
    const query = searchParams.get('query');

    if (query) {
      setLoading(true);
      getProductsBySearch(query as string)
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
  }, [handleSearch]);

  return (
    <div className='relative bg-red-500'>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Search for products"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      {!loading && data.length <= 0 && null}
      
       {loading  ? (
            <div className=' absolute bg-green-800  w-full top-full left-0 mt-2 flex flex-col shadow-sm p-1'><p className='p-2'>Loading...</p></div>
          ) : data.length > 0 && searchParams.get('query') ? (
            <div className="mt-2 z-10 absolute top-full left-0 bg-gray-700 overflow-y-auto no-scrollable flex flex-col shadow-sm p-1 text-xs">
              {data.map((product: ProductType) => (
                <div key={product.id} className="hover:bg-[#f6f6f6]  rounded-md z-100  text-xs cursor-pointer mt-2">
                  <p className="p-2">{product.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <>

              {data.length <= 0 && !data ? null: 
              (
                    
                      <div className= { `mt-2  flex flex-col  absolute bg-blue-100 w-full top-full left-0 z-10 shadow-sm py-1`} >
                      {searchParams.get('query') ? (
                        <p className='p-3'>No products found</p>
                      ) : null}
                    </div>
            )
              }
            </>
            
            
            
          )}
    </div>
  );
}
