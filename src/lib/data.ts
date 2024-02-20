import {ProductType, CartItemType, CartType, PaymentType, CategoryType} from '@/lib/types'

export async function getAllProducts(){
    const res = await fetch('http://localhost:3000/api/product')
    const products = await res.json()
    // console.log(products);
    return products
    
}



export async function getProductsByCategory(category:string){
    const res = await fetch(`http://localhost:3000/api/product?category=${category}`)
    const products = await res.json()
    return products
}

export async function getPaginatedProducts(limit:number){
    const res = await fetch(`http://localhost:3000/api/product/query?limit=${limit}`)
    const products = await res.json()
    return products
}

export async function getProductsBySearch(searchParams:string){
    const res = await fetch(`http://localhost:3000/api/product/query?query=${searchParams}`)
    const products = await res.json()
    return products
}

export async function getProductById(id:string){
    const res = await fetch(`http://localhost:3000/api/product/${id}`)
    const product = await res.json()
    return product
}

export async function createProducts(data:any){
    const res = await fetch('http://localhost:3000/api/product',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const product = await res.json()
    return product
}

export async function updateProducts(id:string,data:any){
    const res = await fetch(`http://localhost:3000/api/product/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const product = await res.json()
    return product
}



//  CATEGORY API

export async function getCategoryById(id:string){
    const res = await fetch(`http://localhost:3000/api/category/${id}`)
    const category = await res.json()
    return category
}

export async function getAllCategories(){
    const res = await fetch('http://localhost:3000/api/category')
    const categories = await res.json()
    return categories
}

export async function deleteCategory(id:string,data:any){
    const res = await fetch(`http://localhost:3000/api/product/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const category = await res.json()
    return category
}

export async function createCategory(data:any){
    const res = await fetch('http://localhost:3000/api/category',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const category = await res.json()
    return category
}

//  CARTITEM API

// export async function getCartItems(){
//     const res = await fetch('http://localhost:3000/api/cartItem')
//     const cartItems = await res.json()
//     return cartItems
// }

export async function createCartItem(data:any){
    const res = await fetch('http://localhost:3000/api/cartItem',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const cartItem = await res.json()
    return cartItem
}

export async function updateCartItem(id:string,data:any){
    const res = await fetch(`http://localhost:3000/api/cartItem/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const cartItem = await res.json()
    return cartItem
}

export async function deleteCartItem(id:string){
    const res = await fetch(`http://localhost:3000/api/cartItem/${id}`,{
        method:'DELETE'
    })
    const cartItem = await res.json()
    return cartItem
}

//  CART API

export async function createCart(){
    const res = await fetch('http://localhost:3000/api/cart',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    })
    const cart = await res.json()
    return cart
}

export async function getCartById(id:string){
    const res = await fetch(`http://localhost:3000/api/cart/${id}`)
    const cart = await res.json()
    return cart
}

export async function updateCart(id:string,data:any){
    const res = await fetch(`http://localhost:3000/api/cart/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const cart = await res.json()
    return cart
}

export async function deleteCart(id:string){
    const res = await fetch(`http://localhost:3000/api/cart/${id}`,{
        method:'DELETE'
    })
    const cart = await res.json()
    return cart
}

//  PAYMENT API

export async function createPayment(data:any){
    const res = await fetch('http://localhost:3000/api/payment',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const payment = await res.json()
    return payment
}

export async function getPaymentById(id:string){
    const res = await fetch(`http://localhost:3000/api/payment/${id}`)
    const payment = await res.json()
    return payment
}

export async function updatePayment(id:string,data:any){
    const res = await fetch(`http://localhost:3000/api/payment/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const payment = await res.json()
    return payment
}

export async function deletePayment(id:string){
    const res = await fetch(`http://localhost:3000/api/payment/${id}`,{
        method:'DELETE'
    })
    const payment = await res.json()
    return payment
}

export async function getAllPayments(){
    const res = await fetch('http://localhost:3000/api/payment')
    const payments = await res.json()
    return payments
}

// ORDER API

export async function createOrder(data:any){
    const res = await fetch('http://localhost:3000/api/order',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const order = await res.json()
    return order
}

export async function getOrderById(id:string){
    const res = await fetch(`http://localhost:3000/api/order/${id}`)
    const order = await res.json()
    return order
}

export async function updateOrder(id:string,data:any){
    const res = await fetch(`http://localhost:3000/api/order/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const order = await res.json()
    return order
}

export async function deleteOrder(id:string){
    const res = await fetch(`http://localhost:3000/api/order/${id}`,{
        method:'DELETE'
    })
    const order = await res.json()
    return order
}


export async function getAllOrders(){
    const res = await fetch('http://localhost:3000/api/order')
    const order = await res.json()
    return order
    
}

// USER API

export async function createUser(data:any){
    const res = await fetch('http://localhost:3000/api/user',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const user = await res.json()
    return user
}

export async function getUserById(id:string){
    const res = await fetch(`http://localhost:3000/api/user/${id}`)
    const user = await res.json()
    return user
}

export async function getAllUsers(){
    const res = await fetch('http://localhost:3000/api/user')
    const user = await res.json()
    return user
}

export async function updateUser(id:string,data:any){
    const res = await fetch(`http://localhost:3000/api/user/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const user = await res.json()
    return user
}

export async function deleteUser(id:string){
    const res = await fetch(`http://localhost:3000/api/user/${id}`,{
        method:'DELETE'
    })
    const user = await res.json()
    return user
}