
export type ProductType = {
  id?: string,
  name: string,
  price: number,
  description: string,
  numberInStock: number,
  imageUrl:string,
  brand:string,
  image: File,
  category?: CategoryType
  categoryId: string
  categoryName: string
}

export type CategoryType ={
    id: string,
    name: string,
    products? : ProductType[]
}


export interface Category{
  name: string;
  products? : ProductType[]
  
}

export type CartItemType ={
    id?: string,
    price:number,
    productId: string,
    quantity: number,
    userId: string,
    product: ProductType;
}

export interface CartItems{
    id: string;
    productId: string;
    price:number,
    quantity: number;
    userId: string,
    product: ProductType; 
}

export type OrderType = {
    id: string;
    userId: string;
    phoneNumber: string;
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
    items: CartItemType[],
    orders?: OrderType[],
    address?: string
}