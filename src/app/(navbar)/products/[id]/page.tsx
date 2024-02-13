import ProductDetails from "@/components/product-details"
import  Container  from "@/components/Container"
import React from 'react'

interface Iparams {
    productId?: string
}

const product = {
  id: 1,
  name: '40A power socket',
  description: 'A 40A Nigerian power socket that can take up to 50 W of power A 40A Nigerian power socket that can take up to 50 W of power,A 40A Nigerian power socket that can take up to 50 W of power,',
  price: 100,
  category: "electrical equipment",
  brand:'hennesson',
  imageUrl: '/socket.jpg',
  quantity: 1,

}
const page = ({params}:{params:Iparams}) => {

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product}/>
      </Container>
    </div>
  )
}

export default page