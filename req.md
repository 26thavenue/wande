- [x]Adding a toast on every action
- Handle session in clerk
- Filter functionality
- [x]Search functionality
- [x] Mapping the pages to its category and product
- [x]Change the any type in ItemsContentProps to cartProduct
- [x] Properly add the quantity and imageUrl to the cart
- [x] Do the set quantity
- [x] Clear cart
- [ ] Truncate all the text in the cart sheet and cart
- [ ] Protect admin route with clerk
- Adding pagination to the products
- Adding pagination for the payments table
- [x]Use navigation menu for category
- Decreasing the number InStock for every succesful purchase i.e if the payment status is pending run anupdate on the product.numberInStock
- Add metadata
- Add a loading state for everything that has useEffect
- Check if the user id matches the userid in the cart and cart item before deleting or updating
- Add transactions
- If the user is logged in they can go to the login and signup page
- The image

Version 2
- Handle Review
- Add rating
- Logging and test
- Calculating price at the backend


Check: 
useUser
auth
useClerk for signout import { useClerk } from "@clerk/nextjs";
useAuth