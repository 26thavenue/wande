
export type ProductType = {
  id?: string,
  name: string,
  price: number,
  description: string,
  numberInStock: number,
  imageUrl:string,
  brand:string,
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
    price: number,
    quantity: number,
    orderId?: string,
    imageUrl: string,
}

export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    cartId? : string;
    orderId?: string;
    product: ProductType;
}

export interface Order{
    id: string;
    userId: string;
    phoneNumber: number;
    total: number;
    items: CartItemType[];
    paymentId?: string;
    address: string;
}

export interface Cart{
    id: string;
    items: CartItemType[];
    userId: string;
    totalPrice: number;
    user:UserType;
}



export type CartType = {
    id: string,
    items: CartItemType[],
    userId: string,
    totalPrice: number,
}

export type OrderType = {
    id?:string,
    userId: string,
    phone: number,
    totalPrice: number,
    products: CartItemType,
    paymentId?: string,
    address?: string,
}

export type PaymentType = {
    id?: string,
    orderId: string,
    amount: number,
    status?: string,
    deliveryDate?: Date,
    user: UserType,
    order: Order,
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