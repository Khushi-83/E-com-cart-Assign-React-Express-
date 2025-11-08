# Vibe Commerce API Documentation

Complete reference for all REST API endpoints.

## Base URL

Development:
\`\`\`
http://localhost:5000/api
\`\`\`

## Authentication

Currently, the API does not require authentication. All requests are treated as guest requests with cart data persisted per session.

## Response Format

All responses are in JSON format. Errors follow this structure:

\`\`\`json
{
  "error": "Error message describing what went wrong"
}
\`\`\`

## Endpoints

### Products

#### GET /api/products

Retrieve all available products.

**Request:**
\`\`\`
GET /api/products
\`\`\`

**Response (200 OK):**
\`\`\`json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "id": "1",
    "name": "Wireless Headphones",
    "price": 129.99,
    "description": "Premium sound quality",
    "category": "Electronics",
    "image": "https://via.placeholder.com/300x300?text=Headphones",
    "rating": 4.5,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "id": "2",
    "name": "USB-C Cable",
    "price": 19.99,
    "description": "Fast charging cable",
    "category": "Accessories",
    "image": "https://via.placeholder.com/300x300?text=Cable",
    "rating": 4.8,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
\`\`\`

**Possible Errors:**
- 500: Internal server error during database query

---

### Cart

#### GET /api/cart

Retrieve the current guest cart.

**Request:**
\`\`\`
GET /api/cart
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "guest",
  "items": [
    {
      "productId": "1",
      "name": "Wireless Headphones",
      "price": 129.99,
      "quantity": 2,
      "image": "https://via.placeholder.com/300x300?text=Headphones",
      "_id": "507f1f77bcf86cd799439014"
    }
  ],
  "total": 259.98,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
\`\`\`

---

#### POST /api/cart

Add an item to the cart or increase quantity if already present.

**Request:**
\`\`\`
POST /api/cart
Content-Type: application/json

{
  "productId": "1",
  "quantity": 2
}
\`\`\`

**Parameters:**
- `productId` (string, required): The ID of the product to add
- `quantity` (number, required): Number of items to add (minimum 1)

**Response (200 OK):**
\`\`\`json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "guest",
  "items": [
    {
      "productId": "1",
      "name": "Wireless Headphones",
      "price": 129.99,
      "quantity": 2,
      "image": "https://via.placeholder.com/300x300?text=Headphones",
      "_id": "507f1f77bcf86cd799439014"
    }
  ],
  "total": 259.98,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
\`\`\`

**Possible Errors:**
- 400: Missing productId or quantity
- 404: Product not found
- 500: Internal server error

---

#### PATCH /api/cart/:productId

Update the quantity of a cart item.

**Request:**
\`\`\`
PATCH /api/cart/1
Content-Type: application/json

{
  "quantity": 5
}
\`\`\`

**Parameters:**
- `productId` (path, required): The ID of the product to update
- `quantity` (body, required): New quantity (minimum 1)

**Response (200 OK):**
\`\`\`json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "guest",
  "items": [
    {
      "productId": "1",
      "name": "Wireless Headphones",
      "price": 129.99,
      "quantity": 5,
      "image": "https://via.placeholder.com/300x300?text=Headphones",
      "_id": "507f1f77bcf86cd799439014"
    }
  ],
  "total": 649.95,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:36:00Z"
}
\`\`\`

**Possible Errors:**
- 400: Quantity less than 1
- 404: Cart not found or item not in cart
- 500: Internal server error

---

#### DELETE /api/cart/:productId

Remove an item from the cart.

**Request:**
\`\`\`
DELETE /api/cart/1
\`\`\`

**Parameters:**
- `productId` (path, required): The ID of the product to remove

**Response (200 OK):**
\`\`\`json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "guest",
  "items": [],
  "total": 0,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:37:00Z"
}
\`\`\`

**Possible Errors:**
- 404: Cart not found
- 500: Internal server error

---

### Checkout

#### POST /api/checkout

Process a checkout and create an order.

**Request:**
\`\`\`
POST /api/checkout
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "cartItems": [
    {
      "productId": "1",
      "name": "Wireless Headphones",
      "price": 129.99,
      "quantity": 2,
      "image": "https://via.placeholder.com/300x300?text=Headphones"
    }
  ]
}
\`\`\`

**Parameters:**
- `name` (string, required): Customer's full name
- `email` (string, required): Customer's email address
- `cartItems` (array, required): Array of items to purchase

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "orderNumber": "ORD-1705330200000",
  "name": "John Doe",
  "email": "john@example.com",
  "items": [
    {
      "productId": "1",
      "name": "Wireless Headphones",
      "price": 129.99,
      "quantity": 2,
      "image": "https://via.placeholder.com/300x300?text=Headphones"
    }
  ],
  "total": 259.98,
  "timestamp": "2024-01-15T10:37:00Z",
  "message": "Order placed successfully!"
}
\`\`\`

**Possible Errors:**
- 400: Missing required fields (name, email, cartItems)
- 400: Empty cartItems array
- 500: Internal server error during order creation

---

## Example Usage

### Complete Shopping Flow

**1. Get Products**
\`\`\`bash
curl http://localhost:5000/api/products
\`\`\`

**2. Add Item to Cart**
\`\`\`bash
curl -X POST http://localhost:5000/api/cart \\
  -H "Content-Type: application/json" \\
  -d '{"productId":"1","quantity":2}'
\`\`\`

**3. View Cart**
\`\`\`bash
curl http://localhost:5000/api/cart
\`\`\`

**4. Update Quantity**
\`\`\`bash
curl -X PATCH http://localhost:5000/api/cart/1 \\
  -H "Content-Type: application/json" \\
  -d '{"quantity":5}'
\`\`\`

**5. Checkout**
\`\`\`bash
curl -X POST http://localhost:5000/api/checkout \\
  -H "Content-Type: application/json" \\
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "cartItems":[{"productId":"1","name":"Wireless Headphones","price":129.99,"quantity":5,"image":"https://via.placeholder.com/300x300?text=Headphones"}]
  }'
\`\`\`

**6. Remove Item**
\`\`\`bash
curl -X DELETE http://localhost:5000/api/cart/1
\`\`\`

---

## Testing with Postman

1. Import this collection into Postman
2. All endpoints use `http://localhost:5000/api` base URL
3. Set up environment variables for easy switching between deployments
4. Use the pre-configured requests to test each endpoint

---

## HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider implementing rate limiting using middleware like `express-rate-limit`.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

---

For more information, see [README.md](./README.md)
