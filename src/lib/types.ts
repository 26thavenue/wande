export type ProductType = {
  id?: string,
  name: string,
  price: number,
  description: string,
  numberInStock?: number,
  imageUrl:string,
  brand:string,
  categoryId?:string,
  categoryName?:string
}

export type CategoryType ={
    id: string,
    name: string,
    products? : ProductType[]
}

export type CartItemType ={
    id?: string,
    productId: string,
    productName: string,
    price: number,
    quantity: number,
    imageUrl: string,
}

export type CartType = {
    id: string,
    items: CartItemType[],
    userId: string,
    totalPrice: number,
}

export type OrderType = {
    userId: string,
    amount: number,
    products: CartItemType[],
    paymentId?: string,
    address?: string,
    cartItemId?: string,
}

export type PaymentType = {
    orderId: string,
    amount: number,
    status?: string,
}
