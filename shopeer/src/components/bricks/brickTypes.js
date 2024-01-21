export default {
    user: [
        {"name": "userId", "placeholder": "id", "label": "id", "type": "number"}, 
        {"name": "firstName", "placeholder": "First name", "label": "First name", "type": "text"}, 
        {"name": "lastName", "placeholder": "Last name", "label": "Last name", "type": "text"}, 
        {"name": "phoneNumber", "placeholder": "phone number", "label": "Phone number", "type": "text"}, 
        {"name": "email", "placeholder": "email", "label": "email", "type": "text"}, 
        {"name": "password", "placeholder": "password", "label": "password", "type": "text"},
    ],
    category: [
        {"name": "categoryId", "placeholder": "id", "label": "id", "type": "text"}, 
        {"name": "name", "placeholder": "name", "label": "Name", "type": "text"}, 
    ],
    product: [
        {"name": "productId", "placeholder": "id", "label": "id", "type": "number"}, 
        {"name": "name", "placeholder": "name", "label": "Name", "type": "text"}, 
        {"name": "price", "placeholder": "Price", "label": "Price", "type": "number"}, 
        {"name": "description", "placeholder": "description", "label": "description", "type": "text"}, 
        {"name": "categoryId", "placeholder": "Category", "label": "Category", "type": "number"},
    ],
    review: [
        {"name": "userId", "placeholder": "user id", "label": "user id", "type": "number"}, 
        {"name": "productId", "placeholder": "review id", "label": "review id", "type": "number"}, 
        {"name": "rating", "placeholder": "rating", "label": "rating", "type": "text"}, 
        {"name": "comment", "placeholder": "comment", "label": "comment", "type": "text"}, 
    ],
    shoporder: [
        {"name": "orderId", "placeholder": "id", "label": "Id", "type": "number"}, 
        {"name": "date", "placeholder": "Date", "label": "Date", "type": "text"}, 
        {"name": "address", "placeholder": "Address", "label": "Address", "type": "text"}, 
        {"name": "status", "placeholder": "status", "label": "Status", "type": "text"}, 
        {"name": "userId", "placeholder": "User id", "label": "User id", "type": "number"},
    ],
    orderitem: [
        {"name": "orderId", "placeholder": "order id", "label": "Order id", "type": "number"}, 
        {"name": "productId", "placeholder": "product id", "label": "Product id", "type": "text"}, 
        {"name": "quantity", "placeholder": "quantity", "label": "Quantity", "type": "text"}, 
        {"name": "total", "placeholder": "total", "label": "Total", "type": "text"}, 
    ]
}