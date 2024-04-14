import FeaturedProducts from '@/components/FeaturedProducts'
import Container from '@/components/Layout/Container'
import Banner from '@/components/Banner'
import ExploreCategory from '@/components/ExploreCategory'
import Discount from '@/components/Discount'
import { getAllProducts } from "@/lib/productQueries"


export default async function Home() {

   const data = await getAllProducts(); 
  

  return (
    <div >
      <Container>
         <Banner />
         <FeaturedProducts products={data}  />
         <ExploreCategory  products={data}/>
         <Discount />
      </Container>
     
    </div>
  )
}
