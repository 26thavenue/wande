
"use client"
import toast from 'react-hot-toast';
import { create  } from 'zustand';
import { persist } from 'zustand/middleware';
import {CartItems, ProductType} from '@/lib/types'
import {getUserById, createCartItem, updateCartItem,deleteCartItem,deleteAllUserCartItems} from '@/lib/data'


interface CartItem extends ProductType {
    count:number
    quantity:number
    name: string
    cartId:string
}

interface UserWithItems{
    id: string
    email: string
    items: CartItem[]
    
}

type CartStore = {
    cart: CartItem[],
    count: () => number;
    isLoading:boolean;
    error:string | null,
    add: (product: ProductType, userId:string) => Promise<void>,
    remove: (idProduct: string, userId:string) => void,
    increaseQuantity: (idProduct: string, userId:string) => Promise<void>,
    decreaseQuantity: (idProduct: string, userId:string) => Promise<void>,
    totalPrice:(cart:CartItem[]) => number,
    removeAll: ( userId:string) => void
    populateCart:(user:any) => void
    check:(userId:string) => void
}


export const useCartStore:any = create<CartStore>()(
   persist(
    (set, get) => ({
        cart: [],
         isLoading: true,
         error: null,
        count: () => {
            const { cart } = get();
            if (cart?.length > 0){
                return cart.reduce((prev, curr) => prev + curr.count, 0);
            }
            return 0;                
        },
        add: async(product: ProductType, userId:string) => {
            try {
                const { cart } = get();
                const updatedCart = await updateCart(product, cart, userId);
                console.log(updatedCart)
                set({ cart: updatedCart , isLoading: false});
                toast.success('Product added to cart');
            } catch (error) {
                console.log(error)
                error = 'Error adding product to cart'
                toast.error(error as string)
            }
            
        },
        remove: (idProduct: string,userId:string ) => {
            const { cart } = get();
            const updatedCart =  removeCart(idProduct, cart);
            set({ cart: updatedCart });
            toast.success('Product removed from cart')
        },
        removeAll: async(userId:string) => {
            const updatedCart = await removeAll(userId);
            set({ cart: [] })
            toast.success('Your cart is empty')
        },
        increaseQuantity: async(idProduct: string, userId:string) => {
            const { cart } = get();
            const updatedCart = await increaseCartItemQuantity(idProduct, cart, userId);
            set({ cart: updatedCart });
            toast.success('Product added to cart');
        },
        decreaseQuantity: async(idProduct: string, userId:string) => {
            const { cart } = get();
            const updatedCart = await decreaseCartItemQuantity(idProduct, cart, userId);
            set({ cart: updatedCart });
            toast.success('Product removed to cart');
        },
        totalPrice:(cart:CartItem[]) => getTotalPrice(cart),

        populateCart: async(user:any) => { 
            const {cart} = get();
            
            
            const updatedCart = await populateCartIfUserWithCartItemsExist(user, cart)
            console.log(updatedCart)
            set({cart:updatedCart})
            console.log('cart:', cart);
        },
        check: async(userId:string) => {
            // const {cart} = get();
            const updatedCart = await checkCartWithDB(userId);
            // console.log(updatedCart)
            set({cart:updatedCart})
        }
            
        
        
        
    }),
        {
            name:'cart-storage',
            skipHydration: true,
        }
    )
    
);


async function updateCart(product: ProductType, cart: CartItem[], userId: string | null): Promise<CartItem[]> {
    const productOnCart = cart?.find(item => item.id === product?.id);

    if (userId) {
        const user: UserWithItems = await getUserById(userId);
        const productId = product?.id as string;
        const quantity = 1;

        if (user) {
            
            const data = await createCartItem(
                productId,
                user.id,
                quantity
            );
        }

        const cartItem = { ...product, count: 1 } as CartItem;
        return [...cart, cartItem];
    }

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

async function removeAll(userId:string){
    try {
        const user = await getUserById(userId);
        if(user){
            const data = await deleteAllUserCartItems(user.id);
            console.log(data);
        }
    } catch (error) {
        console.log(error)
    }
    

}

async function increaseCartItemQuantity(idProduct: string, cart: CartItem[], userId: string): Promise<CartItem[]> {
    try {
        if (userId && userId =="") {
            const user = await getUserById(userId);
            const item = user.items.find((item:any) => item.productId === idProduct)
            const itemId = item?.id as string;
            const quantity = item?.count as number;
            const increasedQty = quantity + 1;

            if (user) {
                await updateCartItem(itemId, increasedQty);
                const updatedCart = cart.map(item => {
                    if (item.id === idProduct && item.count > 1) {
                        return { ...item, count: item.count + 1 };
                    }
                    return item;
                });
                return updatedCart;
            }
        }

        // If no user or userId provided, just decrease the quantity in the cart array
        const updatedCart = cart.map(item => {
            if (item.id === idProduct && item.count > 1) {
                return { ...item, count: item.count + 1 };
            }
            return item;
        });
        return updatedCart;
    } catch (error) {
        console.log(error);
        return cart; // Return the original cart array if an error occurs
    }
}

async function decreaseCartItemQuantity(idProduct: string, cart: CartItem[], userId: string): Promise<CartItem[]> {
    try {
        
        if (userId) {
            const user = await getUserById(userId);
            const item = user.items.find((item:any) => item.productId === idProduct)
            const itemId = item?.id as string;
            const quantity = item?.quantity as number;
            const decreasedQty = quantity - 1;


            if (user) {
                const data = await updateCartItem(itemId, decreasedQty);
                const updatedCart = cart.map(item => {
                    if (item.id === idProduct && item.count > 1) {
                        return { ...item, count: item.count - 1 };
                    }
                console.log(data)
                    return item;
                });
                return updatedCart;
            }
        }

        // If no user or userId provided, just decrease the quantity in the cart array
        const updatedCart = cart.map(item => {
            if (item.id === idProduct && item.count > 1) {
                return { ...item, count: item.count - 1 };
            }
            return item;
        });
        return updatedCart;
    } catch (error) {
        console.log(error);
        return cart; // Return the original cart array if an error occurs
    }
}


function getTotalPrice(cart: CartItem[]): number {
    if(cart.length === 0 || !cart) return 0;
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

async function populateCartIfUserWithCartItemsExist(user: any, cart: CartItem[]) {
    if(user == null) return cart;
    const externalId = user?.id as string;

    try {
        const data: UserWithItems = await getUserById(externalId);
        // console.log(data)
        
        if (data.items.length > 0) {
            const products = data.items.map((item: any) => ({
                ...item.product,
                count: item.quantity
            }));

            const mergedCartItems: CartItem[] = [...cart, ...products];
            const groupedProducts: { [id: string]: CartItem } = {};

            mergedCartItems.forEach((product: any) => {
                if (groupedProducts[product.id]) {
                    groupedProducts[product.id].count += product.count;
                } else {
                    groupedProducts[product.id] = { ...product };
                }
            });

            const productArray = Object.values(groupedProducts);
            // console.log(productArray)
            return productArray;
        }
        return cart
    } catch (error) {
        console.log(error);
    }

    return cart;
}

async function checkCartWithDB(userId: string) {
    try {
        
        const user = await getUserById(userId);
        // console.log(user)
        
        if (user) {  
              
            if (user.items.length > 0) {
                const products = user.items.map((item: any) => ({
                    ...item.product,
                    count: item.quantity
                }));

                const mergedCartItems: CartItem[] = [...products];
                return mergedCartItems
            }
    
           
        }

       
        
    } catch (error) {
        // Handle any errors
        console.error('Error checking cart with database:', error);
        throw error; // Optionally re-throw the error
    }
}



