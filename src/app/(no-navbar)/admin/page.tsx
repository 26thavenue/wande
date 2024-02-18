'use client'
import Container from '@/components/Container'


import { getAllCategories, getAllProducts } from '@/lib/data'
import { useEffect,useState } from 'react'

export  function page() {
  const[products,setProducts] = useState([])
  const[categories,setCategories] = useState([])
  useEffect(() => {
    getAllCategories().then((data) => { setCategories(data) }).catch((error) => { console.log(error) }) 
    getAllProducts().then((data) => { setProducts(data) }).catch((error) => { console.log(error) })
  }
  , [])
  return (
    <div >
      <Container>
        <main className="flex-col my-3">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-[14px] mb-6  text-[#b6b6b6]">Overview of your store's activity</p>
        </main>

        <div className="grid md:grid-cols-2 lg:grid-ccols-3 xl:grid-cols-3 gap-6 cursor-pointer">
          <div className=" p-6 shadow-md flex flex-col gap-4 items-center hover:shadow-sm transition">
            <h2 className='text-xl'>Total Revenue</h2>
            <p className='text-3xl text-bold'> $240</p>
          </div>
          <div className=" p-6 shadow-md flex flex-col gap-4 items-center hover:shadow-sm transition">
            <h2 className='text-xl'>Total Products</h2>

            <p className='text-3xl text-bold'>{products.length}</p>
          </div>
          <div className=" p-6 shadow-md flex flex-col gap-4 items-center hover:shadow-sm transition">
            <h2 className='text-xl '>Categories</h2>
            <p className='text-3xl text-bold'>{categories.length}</p>
          </div>
          

        </div>
      </Container>     
    </div>
  )
}

export default page