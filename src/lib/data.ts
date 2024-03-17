import {ProductType, CartItemType,OrderType,Category, PaymentType, CategoryType} from '@/lib/types'

export async function getAllProducts(){
    try {
         const res = await fetch('http://localhost:3000/api/product')
         const products = await res.json()
        // console.log(products);
        return products
    } catch (error) {
        console.log(error)
    }
   
    
}



export async function getProductsByCategory(category:string){
    try {
        const res = await fetch(`http://localhost:3000/api/product?category=${category}`)
        const products = await res.json()
        return products
    } catch (error) {
        console.log(error)
    }
    
}

export async function getPaginatedProducts(limit:number){
    try {
        const res = await fetch(`http://localhost:3000/api/product/query?limit=${limit}`)
        const products = await res.json()
        return products
    } catch (error) {
        console.log(error)
    }
    
}

export async function getProductsBySearch(searchParams:string){
    try {
         const res = await fetch(`http://localhost:3000/api/product/query?query=${searchParams}`)
        const products = await res.json()
        return products
    } catch (error) {
        console.log(error)
    }
   
}

export async function getProductById(id:string){
    try {
        const res = await fetch(`http://localhost:3000/api/product/${id}`)
        const product = await res.json()
        return product
    } catch (error) {
       console.log(error) 
    }
    
}

export async function createProducts(data:FormData){
    try {
         const res = await fetch('http://localhost:3000/api/product',{
                method:'POST',
                body: data
                })
        if(!res.ok) {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        }
        return res.json();
    } catch (error) {
        console.log(error)
    }
   
    // return res.json()
}

export async function updateProducts(id:string,data:ProductType){
    try {
             const res = await fetch(`http://localhost:3000/api/product/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const product = await res.json()
    return product  
    } catch (error) {
        console.log(error)
    }
   
}
export async function deleteProducts(id:string){
    try {
             const res = await fetch(`http://localhost:3000/api/product/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
               
            })
            const product = await res.json()
    return product  
    } catch (error) {
        console.log(error)
    }
   
}



//  CATEGORY API

export async function getCategoryById(id:string){
    try {
         const res = await fetch(`http://localhost:3000/api/category/${id}`)
        const category = await res.json()
        return category
    } catch (error) {
        console.log(error)
    }
   
}

export async function getAllCategories(){
    try {
        const res = await fetch('http://localhost:3000/api/category')
        const categories = await res.json()
        return categories
    } catch (error) {
        console.log(error)
    }
    
}

export async function deleteCategory(id:string,data:CategoryType){
    try {
         const res = await fetch(`http://localhost:3000/api/product/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
        })
        const category = await res.json()
        return category
    } catch (error) {
        console.log(error)
    }
   
}

export async function createCategory(data:Category){
    try {
        const res = await fetch('http://localhost:3000/api/category',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        if(!res.ok){
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        } 
        return res.json(); 
    } catch (error) {
        console.log(error)
    }
    
}

//  CARTITEM API


export async function createCartItem(productId:string, userId:string, quantity:number){
    try {
         const res = await fetch('http://localhost:3000/api/cart',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({productId, userId ,quantity})
    })
    const cartItem = await res.json()
    
    return cartItem 
    } catch (error) {
        console.log(error)
    }
    
   
}

export async function updateCartItem(id:string,quantity:number){
    try {
        console.log({id,quantity})
        const res = await fetch(`http://localhost:3000/api/cart/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({quantity})
        })
        const cartItem = await res.json()
       
        return cartItem
    } catch (error) {
        console.log(error)
    }
    
}

export async function deleteCartItem(id:string){
    try {
        const res = await fetch(`http://localhost:3000/api/cart/${id}`,{
            method:'DELETE'
        })
        const cartItem = await res.json()
        return cartItem
    } catch (error) {
        console.log(error)
    }
    
}

export async function deleteAllUserCartItems(userId:string){
    try {
             const res = await fetch(`http://localhost:3000/api/cart/user/${userId}`,{
                method:'DELETE'
            })
            const cartItem = await res.json()
            return cartItem
    } catch (error) {
        
    }
}



//  PAYMENT API

export async function createPayment(data:PaymentType){
    try {
         const res = await fetch('http://localhost:3000/api/payment',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const payment = await res.json()
        return payment
    } catch (error) {
        console.log(error)
    }
   
}

export async function getPaymentById(id:string){
    try {
        const res = await fetch(`http://localhost:3000/api/payment/${id}`)
        const payment = await res.json()
        return payment 
    } catch (error) {
        console.log(error)
    }
   
}

export async function updatePayment(id:string,data:PaymentType){
    try {
        const res = await fetch(`http://localhost:3000/api/payment/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const payment = await res.json()
        return payment  
    } catch (error) {
        console.log(error)
    }
    
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

export async function createOrder(address:string,phoneNumber:string,userId:string){
    try {
        const res = await fetch('http://localhost:3000/api/order',{
            method:'POST',
            body:JSON.stringify({address,phoneNumber,userId})
            })
        if(!res.ok) {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        }
        return res.json();
    } catch (error) {
        console.log(error)
    }
    
}

export async function getOrderById(id:string){
    try {
         const res = await fetch(`http://localhost:3000/api/order/${id}`)
        const order = await res.json()
        return order
    } catch (error) {
        console.log(error)
    }
   
}

export async function updateOrder(id:string,data:OrderType){
    try {
            const res = await fetch(`http://localhost:3000/api/order/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const order = await res.json()
            return order
    } catch (error) {
        console.log(error)
    }
    
}

export async function deleteOrder(id:string){
    try {
            const res = await fetch(`http://localhost:3000/api/order/${id}`,{
                method:'DELETE'
            })
            const order = await res.json()
            return order
    } catch (error) {
        console.log(error)
    }
    
}


export async function getAllOrders(){
    try {
        const res = await fetch('http://localhost:3000/api/order')
        const order = await res.json()
        return order 
    } catch (error) {
        console.log(error)
    }
    
    
}

// USER API

export async function createUser({name,email,externalId}:{name:string,email:string,externalId:string}){
    try {
         const res = await fetch('http://localhost:3000/api/user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email,externalId})
        })
        if(!res.ok) {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        }
        return res.json();
    } catch (error) {
        console.log(error)
    }
   
}

export async function getUserById(id:string){
    try {
         const res = await fetch(`http://localhost:3000/api/user/${id}`) 
        if(!res.ok) {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        }
        return res.json();
    } catch (error) {
        console.log(error)
    }
   
}

export async function getAllUsers(){
    try {
        const res = await fetch('http://localhost:3000/api/user')
        const user = await res.json()
        return user
    } catch (error) {
        console.log(error)
    }
    
}

export async function updateUser(id:string,data:any){
    try {
        const res = await fetch(`http://localhost:3000/api/user/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const user = await res.json()
        return user 
    } catch (error) {
        console.log(error)
    }
   
}

export async function deleteUser(id:string){
    try {
        const res = await fetch(`http://localhost:3000/api/user/${id}`,{
            method:'DELETE'
        })
        const user = await res.json()
        return user
    } catch (error) {
        console.log(error)
    }
    
}