- [x] Adding a toast on every action
- [X] Add loader for the featured products
- [x] Search functionality
- [x] Mapping the pages to its category and product
- [x] Change the any type in ItemsContentProps to cartProduct
- [x] Properly add the quantity and imageUrl to the cart
- [x] Do the set quantity  
- [x] Fix the state
- [x] If there is no internet
- [x] Clear cart
- [x] Delivery fee
- [x] The picture
- [x] Make the category Name check case sensitive
- [x] Truncate all the text in the cart sheet and cart
- [x] Fix the broken login from product page
- [x] An out of stock banner on the app
- [x] Adding pagination to the products
- [x] Use navigation menu for category
- [x] Add a loading state for everything that has useEffect
- [x] Add transactions in the order page
- [x] If the user is logged in they cant go to the login and signup page
- [x] The image
- [x] Calculating price at the backend
- [x] Protect admin route with rbac
- [x] Responsiveness
- [ ] Confirm Responsiveness
- [<>] Connect the cart Item(ongoing)
- [-] Handle session in clerk
- [ ] Filter functionality and Product Page
- [-] Add metadata
- [x] Disable normal email signup
- [ ] Update , Delete Order , Product and Category
- [ ] Turn the remove button to remove all the instances of the objectn, 
- [ ] We have to make sure that the products being ordered is lesser than the number in stock
- [-] Check if the user id matches the userid in the cart and cart item before deleting or  updating
- [ ] Adding pagination for the payments table
- [ ] Fix the search params
- [x] Confrim order to trigger the payment api and confirmation mail
- [ ] Add a suspense
- [x] Add more life e.g illustrations and all to the pages
- [x] Order page
- [<>] Decreasing the number InStock for every successful purchase i.e if the payment status is pending run anupdate on the product.numberInStock
- [ ] If its out of stock diable the add to cart button on the product details 
- [x] Add cart items to order table before clearing the cart


Version 2
- Handle Review
- Add rating
- Add an address table
- Logging and test
- Create a new brand table
- Better error handling
- Create a layout folder in the components
- Please notify me for out stock 
- Invalid cart item when the number in stock is less than a user cart item


Flow
- Checkout button -> Order form page -> (Your order has been received/Payment Details page / Go back to shopping/Fire the orderReceivedMail button with a link to the website and some images/Fires the post request on the payment api ) -> Payment received mail by changing the status of the order from not paid to paid