import React,{useState} from 'react'
import { Button } from './ui/button'
import { useCartStore } from '@/lib/cart'
import { Product } from '@/lib/cart'

interface QuantityProps {
  product:Product
}

const QuantityButton:React.FC<QuantityProps> = ({product}) => {
  const {increaseQuantity:handleIncreaseQuantity} = useCartStore()
  const {decreaseQuantity:handleDecreaseQuantity} = useCartStore()
  const [quantity, setQuantity] = useState<number>(product.quantity)

   const handleIncrease = () => {
    handleIncreaseQuantity(product.id);
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      handleDecreaseQuantity(product.id);
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className='flex gap-3 items-center '>
      <Button
        onClick={handleDecrease} 
      variant="secondary"
      className='py-1 px-3 '> - </Button>
      <p>{quantity}</p>
      <Button
      onClick={handleIncrease} 
      variant="secondary"
      className='py-1 px-3 '> + </Button>
    </div>
  )
}

export default QuantityButton