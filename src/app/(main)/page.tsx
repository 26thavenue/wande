import FeaturedProducts from '@/components/FeaturedProducts'
import Container from '@/components/Layout/Container'
import Banner from '@/components/Banner'
import ExploreCategory from '@/components/ExploreCategory'
import Discount from '@/components/Discount'



export default function Home() {
  return (
    <div >
      <Container>
         <Banner />
         <FeaturedProducts />
         <ExploreCategory />
         <Discount />
      </Container>
     
    </div>
  )
}
