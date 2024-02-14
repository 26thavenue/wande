import React from 'react'
// import { Separator } from '@radix-ui/react-separator'
import { Separator } from '@/components/ui/separator'
import ProductCard from '@/components/product-card'
import { Product } from '@/lib/cart'



const FeaturedProducts = () => {

  const products: Product[] = [
    {
      id: 1,
      name: "Socket",
      price: 40,
      description: "A Socket.",
      brand: "Apple",
      category: "Electronics",
      imageUrl: "/socket.jpg",
      quantity: 1
    },
    {
      id: 2,
      name: "Socket",
      price: 40,
      description: "A Socket.",
      brand: "Apple",
      category: "Electronics",
      imageUrl: "/socket.jpg",
      quantity: 1
    },
    {
      id: 3,
      name: "Socket",
      price: 40,
      description: "A Socket.",
      brand: "Apple",
      category: "Electronics",
      imageUrl: "/socket.jpg",
      quantity: 1
    },
    
  ];

  return (
    <div className='mx-auto w-full'>
        <p className="text-lg  p-6">FEATURED PRODUCTS</p>
        <Separator orientation='horizontal' className="w-full" />
        <div className="text-sm pt-4 flex gap-4">
            {products.map(product => 
                <ProductCard key={product.id} 
                id={product.id} 
                name={product.name} 
                price={product.price}
                description={product.description}
                imageUrl={product.imageUrl}
                quantity={product.quantity}/>
            )}
        </div>

    </div>
  )
}

export default FeaturedProducts