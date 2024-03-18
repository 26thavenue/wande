'use client'
 
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';



export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

 


  const onSearch = (event:React.FormEvent) => {
    event.preventDefault();

    const encodedSearchQuery = encodeURI(query)
    router.push(`/search?q=${encodedSearchQuery}`)
    setQuery('')
    // console.log(query)
  }

  return (
    <form className='flex justify-center  ' onSubmit={onSearch}>
      <input
        value={query}
        className=" block   rounded-md border border-gray-200 py-[9px] pl-10 text-xs lg:text-sm  xl:text-sm outline-2 placeholder:text-gray-500"
        placeholder="Search for products"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
     
    </form>
  );
}
