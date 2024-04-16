import ProductList from "@/components/ProductList"
import { getAllProducts } from "@/lib/productQueries"

const ProductPage = async() => {

  return (
    <div>
      <ProductList/>
    </div>
  )
}

export default ProductPage