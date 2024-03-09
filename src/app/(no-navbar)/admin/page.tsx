'use client'

import Container from '@/components/Container';
import { PuffLoader } from "react-spinners";
import { getAllCategories, getAllProducts, getUserById } from '@/lib/data';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/router' instead of 'next/navigation'
import { useUser } from '@clerk/nextjs';

export function Page() { // Renamed function to start with uppercase letter
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;


  useEffect(() => {
    getAllCategories()
      .then((data) =>{
        setLoading(true), // Set loading to false after successful user check
      setCategories(data)
      setLoading(false);
      } 
    )
      .catch((error) => console.log(error));
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <PuffLoader color="#b6b6b6" className="mx-auto" />
        </div>
      ) : (
        <Container>
          <main className="flex-col my-3">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-[14px] mb-6  text-[#b6b6b6]">
              Overview of your store's activity
            </p>
          </main>

          <div className="grid md:grid-cols-2 lg:grid-cols-32 xl:grid-cols-2 gap-6 cursor-pointer">
            <div className=" p-6 shadow-md flex flex-col gap-4 items-center hover:shadow-sm transition">
              <h2 className="text-xl">Total Products</h2>
              <p className="text-3xl text-bold">{products.length}</p>
            </div>
            <div className=" p-6 shadow-md flex flex-col gap-4 items-center hover:shadow-sm transition">
              <h2 className="text-xl ">Categories</h2>
              <p className="text-3xl text-bold">{categories.length}</p>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default Page;
