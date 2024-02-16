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

type CartItemType ={
    productId: string,
    productName: string,
    price: number,
    quantity: number,
    imageUrl: string,
}

type OrderType = {
    userId: string,
    amount: number,
    products: ProductType[],
    payment_id?: string,
    address?: string,
}

type PaymentType = {
    orderId: string,
    amount: number,
}
