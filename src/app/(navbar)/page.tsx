import React from 'react'
import Banner from '@/components/Banner'
import FeaturedProducts from '@/components/featured-products'
import Container from '@/components/Container'
import ExploreCategory from '@/components/exploreCategory'
const page = () => {
  return (
    <div>
      <Container>
        <Banner/>
        <div className="">
          <FeaturedProducts />
          <ExploreCategory />
        </div>
        
      
      </Container>
        
      
    </div>
  )
}

export default page