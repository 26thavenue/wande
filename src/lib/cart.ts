
"use client"
import toast from 'react-hot-toast';
import { create , StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';
import {CartItems, ProductType} from '@/lib/types'


interface CartItem extends CartItems {
    count:number
    imageUrl: string
    name: string
    
}



type CartStore = {
    cart: CartItem[],
    count: () => number;
    add: (product: ProductType) => void,
    remove: (idProduct: string) => void,
    increaseQuantity: (idProduct: string) => void,
    decreaseQuantity: (idProduct: string) => void,
    totalPrice:(cart:CartItem[]) => number,
    removeAll: () => void
}


export const useCartStore = create<CartStore>()(
   persist(
    (set, get) => ({
        cart: [],
        count: () => {
            const { cart } = get();
            if (cart.length > 0)
                return cart.reduce((prev, curr) => prev + curr.count, 0);
            return 0;
        },
        add: (product: ProductType) => {
            const { cart } = get();
            const updatedCart = updateCart(product, cart)
            set({ cart: updatedCart });
            toast.success('Product added to cart');
        },
        remove: (idProduct: string) => {
            const { cart } = get();
            const updatedCart = removeCart(idProduct, cart);
            set({ cart: updatedCart });
            toast.success('Product removed from cart')
        },
        removeAll: () => set({ cart: [] }),
        increaseQuantity: (idProduct: string) => {
            const { cart } = get();
            const updatedCart = increaseCartItemQuantity(idProduct, cart);
            set({ cart: updatedCart });
        },
        decreaseQuantity: (idProduct: string) => {
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


function updateCart(product: ProductType, cart: CartItem[]): CartItem[] {
    const productOnCart = cart.find(item => item.id === product.id);
    
    if (!productOnCart) {
        const cartItem = { ...product, count: 1 } as unknown as CartItem;
        return [...cart, cartItem];
    } else {
        return cart.map(item => {
            if (item.id === product.id) {
                return { ...item, count: item.count + 1 } as CartItem;
            }
            return item;
        });
    }
}

function removeCart(idProduct: string, cart: CartItem[]): CartItem[] {
    return cart.map(item => {
        if (item.id === idProduct)
            return { ...item, count: item.count - 1 }
        return item;
    }).filter(item => {
        return item.count;
    });
}

function increaseCartItemQuantity(idProduct: string, cart: CartItem[]): CartItem[] {
    return cart.map(item => {
        if (item.id === idProduct) {
            return { ...item, quantity: item.quantity + 1 };
        }
        return item;
    });
}

function decreaseCartItemQuantity(idProduct: string, cart: CartItem[]): CartItem[] {
    return cart.map(item => {
        if (item.id === idProduct && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
    });
}

function getTotalPrice(cart: CartItem[]): number {
    if(cart.length === 0 || !cart) return 0;
    return cart.reduce((total, item) => total + item.product.price * item.count, 0);
}
