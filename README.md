# Vibe Commerce - E-Commerce Shopping Cart App

A full-stack e-commerce shopping cart application built with React, Express.js, and MongoDB. This project demonstrates a complete shopping experience including product browsing, cart management, and mock checkout functionality.

## 📋 Project Overview

This is a screening project for Vibe Commerce that showcases:
- **Product Grid**: Browse 8 mock products with ratings and descriptions
- **Shopping Cart**: Add/remove items, adjust quantities, and view totals
- **Checkout Flow**: Enter customer information and receive mock receipts
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Error Handling**: Comprehensive error handling and user feedback
- **Database Integration**: MongoDB persistence for products, carts, and orders

## 🏗️ Architecture

```
vibe-commerce/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── checkout.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProductGrid.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── CartView.jsx
    │   │   └── CheckoutForm.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── App.css (+ component CSS files)
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create `.env` file:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. **Configure environment variables in `.env`:**
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/vibe-commerce
   PORT=5000
   \`\`\`

   For MongoDB Atlas:
   \`\`\`env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vibe-commerce
   PORT=5000
   \`\`\`

5. **Start the backend server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   \`\`\`bash
   cd frontend
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create `.env` file:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. **Configure environment variables in `.env`:**
   \`\`\`env
   VITE_API_URL=http://localhost:5000/api
   \`\`\`

5. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Application will run on `http://localhost:3000`

## 📡 API Endpoints

### Products
- **GET `/api/products`** - Retrieve all products
  - Response: Array of products with id, name, price, description, image, rating

### Cart
- **GET `/api/cart`** - Get current cart
  - Response: Cart object with items and total
  
- **POST `/api/cart`** - Add item to cart
  - Body: `{ productId: string, quantity: number }`
  - Response: Updated cart object
  
- **PATCH `/api/cart/:productId`** - Update item quantity
  - Body: `{ quantity: number }`
  - Response: Updated cart object
  
- **DELETE `/api/cart/:productId`** - Remove item from cart
  - Response: Updated cart object

### Checkout
- **POST `/api/checkout`** - Process checkout
  - Body: `{ name: string, email: string, cartItems: array }`
  - Response: Receipt object with orderNumber, timestamp, total

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Dark primary (#1a1a1a), White secondary, Blue accent (#0066ff)
- **Responsive Grid**: Auto-fill grid layout that adapts to screen size
- **Smooth Interactions**: Hover effects, loading states, and transitions
- **Accessibility**: Semantic HTML, ARIA labels, proper form validation

### Pages & Components

#### Product Grid
- Displays 8 mock products in a responsive grid
- Each product card shows image, name, description, rating, and price
- Quantity selector with increment/decrement buttons
- Add to cart button with loading state

#### Shopping Cart
- List view of cart items with image, price, and quantity
- Quantity adjustment and item removal
- Automatic total calculation
- Cart summary with subtotal and total
- Checkout button

#### Checkout Form
- Two-column layout: form on left, order summary on right
- Input fields for full name and email
- Order summary showing all items and total
- Submit button with loading spinner
- Form validation

#### Receipt Modal
- Displays after successful checkout
- Shows order number, customer name, total, and timestamp
- Auto-redirects to shop after 3 seconds

## 📦 Mock Data

The application includes 8 mock products:
1. Wireless Headphones - $129.99
2. USB-C Cable - $19.99
3. Phone Case - $34.99
4. Portable Charger - $45.99
5. Screen Protector - $12.99
6. Laptop Stand - $79.99
7. Mechanical Keyboard - $159.99
8. Wireless Mouse - $49.99

## ✨ Features Implemented

### Core Features
- ✅ Product catalog with browsing
- ✅ Add/remove items from cart
- ✅ Update item quantities
- ✅ Cart total calculation
- ✅ Checkout form with validation
- ✅ Mock receipt generation
- ✅ Order persistence to MongoDB

### Bonus Features
- ✅ Database persistence (MongoDB)
- ✅ Comprehensive error handling
- ✅ Loading states and spinners
- ✅ Responsive mobile design
- ✅ Smooth animations and transitions
- ✅ Guest cart management
- ✅ Order history in database

## 🛠️ Tech Stack

**Frontend:**
- React 18.2
- Vite (build tool)
- Lucide React (icons)
- CSS3 with Flexbox/Grid

**Backend:**
- Express.js
- Node.js
- MongoDB with Mongoose
- CORS enabled

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above - Full grid layout
- **Tablet**: 768px - 1199px - 2-column grid
- **Mobile**: Below 768px - Single column layout
- **Small Mobile**: Below 480px - Optimized compact layout

## 🚢 Building for Production

### Frontend
\`\`\`bash
cd frontend
npm run build
\`\`\`
Outputs to `dist/` folder ready for deployment

### Backend
Ensure MongoDB connection string is set for production database and deploy to a Node.js hosting service

## 📝 Example Workflow

1. **Browse Products**: Homepage displays all available products
2. **Add to Cart**: Select quantity and click "Add to Cart"
3. **View Cart**: Click cart icon in header to view items
4. **Adjust Quantities**: Use +/- buttons to modify quantities
5. **Proceed to Checkout**: Click checkout button
6. **Enter Details**: Fill in name and email
7. **Submit Order**: Click payment button
8. **View Receipt**: See order confirmation modal with order number and timestamp

## 🐛 Error Handling

The application includes error handling for:
- Failed API requests
- Missing or invalid data
- Network connectivity issues
- Form validation errors
- Database connection failures

Errors are displayed in user-friendly banners and modals.

## 📸 Screenshots

### Home Page / Product Grid
- Header with Vibe Commerce branding and cart button
- Grid of product cards (8 products)
- Each card shows image, name, description, rating, price, and add to cart

### Shopping Cart
- List of items with quantities
- Remove buttons for each item
- Cart summary section
- Checkout button

### Checkout Form
- Customer information form (name, email)
- Order summary sidebar
- Submit button

### Order Receipt
- Order number and confirmation
- Customer name confirmation
- Total amount
- Timestamp of order

## 🔐 Security Considerations

- CORS enabled for frontend-backend communication
- Input validation on all API endpoints
- Error messages don't expose sensitive information
- Guest cart system (no user authentication in mock)

## 📚 Future Enhancements

- User authentication and accounts
- Real payment processing (Stripe integration)
- Order history for users
- Product search and filtering
- Product reviews and ratings
- Wishlist functionality
- Coupon/discount codes
- Admin dashboard

## 🤝 Contributing

This is a screening project. For contributions or suggestions, please reach out to the development team.

## 📄 License

MIT License - This project is provided as-is for screening purposes.

## 📞 Support

For issues or questions about this project, please check:
1. Ensure MongoDB is running
2. Check that both backend and frontend servers are running
3. Verify environment variables are correctly set
4. Check browser console for error messages
5. Check backend server logs for API errors

---

**Created for Vibe Commerce Screening**
