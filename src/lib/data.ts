export async function getProducts(){
    try {
         const res = await fetch('/api/product')
         const products = await res.json()
        // console.log(products);
        return products
    } catch (error) {
        console.log(error)
    }
   
    
}