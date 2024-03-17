import React,{useState, useEffect} from 'react'
import { Button } from './ui/button'
import { useCartStore } from '@/lib/cart'
import { CartItemType, ProductType } from '@/lib/types'
import toast,{Toaster} from 'react-hot-toast';
interface QuantityProps {
  product:ProductType
  cartItem:CartItemType
  userID:string
}

const QuantityButton:React.FC<QuantityProps> = ({product,userID}) => {
  const {increaseQuantity:handleIncreaseQuantity} = useCartStore()
  const {decreaseQuantity:handleDecreaseQuantity} = useCartStore()
  const {cart} = useCartStore()
  const [quantity, setQuantity] = useState<number>(0)

   useEffect(() => {
    const cartItem = cart.find((item: CartItemType) => item.id === product.id);

    if (cartItem) {
      setQuantity(cartItem.count);
    } else {
      setQuantity(0);
    }
  }, [cart, product]);

   const handleIncrease = () => {
    if(quantity > product.numberInStock) return toast.error('Not enough stock')
    handleIncreaseQuantity(product.id,userID);
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      handleDecreaseQuantity(product.id,userID);
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
      <Toaster/>
    </div>
  )
}

export default QuantityButton