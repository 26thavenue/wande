
export type ProductType = {
  id?: string,
  name: string,
  price: number,
  description: string,
  numberInStock: number,
  imageUrl:string,
  brand:string,
  category?: CategoryType
  categoryId: string
}

export type CategoryType ={
    id: string,
    name: string,
    products? : ProductType[]
}

export type CartItemType ={
    id?: string,
    productId: string,
    quantity: number,
    orderId?: string,
    userId: string,
    product: ProductType;
}

export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    cartId? : string;
    orderId?: string;
    
}

export type OrderType = {
    id: string;
    userId: string;
    phoneNumber: number;
    total: number;
    items: CartItemType[];
    paymentId?: string;
    address: string;
    deliveryStatus?:string
    deliveryDate?: string;
}



export type PaymentType = {
    id?: string,
    orderId: string,
    amount: number,
    status?: string,
}

export type UserType = {
    id?: string,
    name: string,
    email: string,
    externalId: string,
    role?: string,
    itesms: CartItemType[],
    orders?: OrderType[],
    address?: string
}