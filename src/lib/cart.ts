"use client"
import toast from 'react-hot-toast';
import { create , StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';

export type Product = {
  id: number,
  name: string,
  price: number,
  description: string,
  quantity:number,
  imageUrl:string,
  brand:string,
  category:string
}

interface CartItem extends Product {
    count:number
}

type CartStore = {
    cart: CartItem[],
    count: () => number;
    add: (product: Product) => void,
    remove: (idProduct: number) => void,
    increaseQuantity: (idProduct: number) => void,
    decreaseQuantity: (idProduct: number) => void,
    totalPrice:(cart:CartItem[]) => number,
    removeAll: () => void
}


export const useCartStore = create<CartStore>()(
   persist(
    (set, get) => ({
        cart: [],
        count: () => {
            const { cart } = get();
            if (cart.length)
                return cart.map(item => item.quantity).reduce((prev, curr) => prev + curr);
            return 0;
        },
        add: (product: Product) => {
            const { cart } = get();
            const updatedCart = updateCart(product, cart)
            set({ cart: updatedCart });
            toast.success('Product added to cart');
        },
        remove: (idProduct: number) => {
            const { cart } = get();
            const updatedCart = removeCart(idProduct, cart);
            set({ cart: updatedCart });
            toast.success('Product removed from cart')
        },
        removeAll: () => set({ cart: [] }),
        increaseQuantity: (idProduct: number) => {
            const { cart } = get();
            const updatedCart = increaseCartItemQuantity(idProduct, cart);
            set({ cart: updatedCart });
        },
        decreaseQuantity: (idProduct: number) => {
            const { cart } = get();
            const updatedCart = decreaseCartItemQuantity(idProduct, cart);
            set({ cart: updatedCart });
        },
        totalPrice:(cart:CartItem[]) => getTotalPrice(cart)
    }),
        {
            name:'cart-storage',
            skipHydration: true,
        }
    )
    
);


function updateCart(product: Product, cart: CartItem[]): CartItem[] {
    
    const cartItem = { ...product, count: 1 } as CartItem;

    const productOnCart = cart.map(item => item.id).includes(product.id);
    
    if (!productOnCart) cart.push(cartItem)
    else {
        return cart.map(item => {
            if (item.id === product.id)
                return { ...item, count: item.count + 1 } as CartItem;
            return item
        })        
    }
    
    return cart;
}

function removeCart(idProduct: number, cart: CartItem[]): CartItem[] {
    return cart.map(item => {
        if (item.id === idProduct)
            return { ...item, count: item.count - 1 }
        return item;
    }).filter(item => {
        return item.count;
    });
}

function increaseCartItemQuantity(idProduct: number, cart: CartItem[]): CartItem[] {
    return cart.map(item => {
        if (item.id === idProduct) {
            return { ...item, quantity: item.quantity + 1 };
        }
        return item;
    });
}

function decreaseCartItemQuantity(idProduct: number, cart: CartItem[]): CartItem[] {
    return cart.map(item => {
        if (item.id === idProduct && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
    });
}

function getTotalPrice(cart: CartItem[]): number {
    if(cart.length === 0 || !cart) return 0;
    return cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
}
