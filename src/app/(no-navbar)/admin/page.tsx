import {Navbar} from '@/components/admin-nav'
import Container from '@/components/Container'
import { Separator } from '@/components/ui/separator'

async function getAllProducts(){
  const res = await fetch('http://localhost:3000/api/product')
  const products = await res.json()
  return products

}
async function getAllCategories(){
  const res = await fetch('http://localhost:3000/api/category')
  const categories = await res.json()
  return categories

}

async function page() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()])
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
            <p className='text-3xl text-bold'></p>
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