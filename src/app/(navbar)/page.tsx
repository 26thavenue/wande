import React from 'react'
import Banner from '@/components/Banner'
import FeaturedProducts from '@/components/featured-products'
import Container from '@/components/Container'
const page = () => {
  return (
    <div>
      <Container>
        <Banner/>
        <div className="">
          <FeaturedProducts />
        </div>
        
      
      </Container>
        
      
    </div>
  )
}

export default page