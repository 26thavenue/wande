import React from 'react'
import Banner from '@/components/Banner'
import FeaturedProducts from '@/components/featured-products'
import Container from '@/components/Container'
import ExploreCategory from '@/components/exploreCategory'
import WhyChooseUs from '@/components/WhyChooseUs'
const page = () => {
  return (
    <div>
      <Container>
        <Banner/>
        <div className="">
          <FeaturedProducts />
          <ExploreCategory />
          <WhyChooseUs />
        </div>
        
      
      </Container>
        
      
    </div>
  )
}

export default page