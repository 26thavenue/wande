
export type ProductType = {
  id?: string,
  name: string,
  price: number,
  description: string,
  numberInStock: number,
  imageUrl:string,
  brand:string,
  categoryId:string,
  category?: CategoryType
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
    id?:string,
    user: UserType,
    phone: number,
    amount: number,
    products: CartItemType[],
    paymentId?: string,
    address?: string,
}

export type PaymentType = {
    id?: string,
    orderId: string,
    amount: number,
    status?: string,
    user: UserType,
}

export type UserType = {
    id?: string,
    name: string,
    email: string,
    externalId: string,
    role?: string,
    cart?: CartType,
    orders?: OrderType[],
    address?: string
}