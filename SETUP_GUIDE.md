# Setup Guide - Vibe Commerce

A comprehensive guide to get the Vibe Commerce e-commerce app running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Node.js** (v14+): Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (choose one):
  - **Local MongoDB**: Install from [mongodb.com](https://www.mongodb.com/try/download/community)
  - **MongoDB Atlas** (Cloud): Free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

### Optional
- **Git**: For cloning and managing the repository
- **Postman**: For testing APIs during development
- **VS Code** or your preferred code editor

## Step 1: MongoDB Setup

### Option A: Local MongoDB

1. **Install MongoDB Community Edition**
   - Windows: Download MSI installer from MongoDB website
   - macOS: Use Homebrew: `brew install mongodb-community`
   - Linux: Follow your distribution's package manager

2. **Start MongoDB**
   - Windows: MongoDB should auto-start or run `mongod` in terminal
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Verify it's running**
   \`\`\`bash
   mongosh
   \`\`\`
   You should see the MongoDB shell prompt.

### Option B: MongoDB Atlas (Cloud)

1. **Create MongoDB Atlas Account**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create a Cluster**
   - Follow the setup wizard
   - Create a free tier cluster (M0)
   - Wait for cluster to be deployed (5-10 minutes)

3. **Get Connection String**
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/vibe-commerce`

## Step 2: Backend Setup

### 2.1 Clone or Download Repository
\`\`\`bash
git clone <repository-url>
cd vibe-commerce/backend
\`\`\`

Or download and extract the ZIP file, then navigate to the backend folder.

### 2.2 Install Dependencies
\`\`\`bash
npm install
\`\`\`

This installs:
- express
- cors
- mongoose
- dotenv
- nodemon (for development)

### 2.3 Configure Environment

1. **Create `.env` file** from the template:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

2. **Edit `.env` file** with your configuration:

   **For Local MongoDB:**
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/vibe-commerce
   PORT=5000
   \`\`\`

   **For MongoDB Atlas:**
   \`\`\`env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vibe-commerce
   PORT=5000
   \`\`\`

### 2.4 Start Backend Server

**Development mode** (with auto-reload):
\`\`\`bash
npm run dev
\`\`\`

**Production mode:**
\`\`\`bash
npm start
\`\`\`

Expected output:
\`\`\`
Server running on port 5000
MongoDB connected
\`\`\`

### 2.5 Test Backend

Open your browser and visit:
\`\`\`
http://localhost:5000/api/health
\`\`\`

You should see: `{"status":"Server is running"}`

## Step 3: Frontend Setup

### 3.1 Navigate to Frontend Directory
\`\`\`bash
cd ../frontend
\`\`\`

### 3.2 Install Dependencies
\`\`\`bash
npm install
\`\`\`

This installs:
- react
- react-dom
- vite
- lucide-react

### 3.3 Configure Environment

1. **Create `.env` file**:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

2. **Edit `.env` file**:
   \`\`\`env
   VITE_API_URL=http://localhost:5000/api
   \`\`\`

### 3.4 Start Frontend Development Server
\`\`\`bash
npm run dev
\`\`\`

Expected output:
\`\`\`
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
\`\`\`

### 3.5 Open Application

Open your browser and navigate to:
\`\`\`
http://localhost:3000
\`\`\`

You should see the Vibe Commerce homepage with products!

## Step 4: Test the Application

### 4.1 Browse Products
- Homepage displays 8 mock products
- Each product shows image, name, rating, and price

### 4.2 Add to Cart
- Select quantity using +/- buttons
- Click "Add" button
- Item should appear in cart (shown in header badge)

### 4.3 View Cart
- Click cart icon in header
- See all items, quantities, and total price
- Adjust quantities or remove items

### 4.4 Checkout
- Click "Proceed to Checkout"
- Enter name and email
- Click "Pay" button
- See order confirmation modal with order number and timestamp

### 4.5 Return to Shop
- After 3 seconds, automatically redirected to product page
- Cart is now empty
- Check MongoDB to see order was saved

## Troubleshooting

### Backend Issues

**"MongoDB connection error"**
- Verify MongoDB is running: `mongosh` in terminal
- Check MONGODB_URI in `.env` file
- For MongoDB Atlas, ensure IP whitelist includes your IP

**"Cannot find module"**
- Delete `node_modules` folder
- Run `npm install` again

**"Port 5000 already in use"**
- Change PORT in `.env` to a different port (e.g., 5001)
- Or kill the process using port 5000:
  - Windows: `netstat -ano | findstr :5000`
  - macOS/Linux: `lsof -i :5000`

### Frontend Issues

**"Cannot GET /"**
- Verify frontend server is running
- Check that port 3000 is not in use
- Try `npm install` again

**"API connection error"**
- Verify backend server is running on port 5000
- Check VITE_API_URL in `.env`
- Open browser DevTools (F12) to see network errors

**"Cannot find module"**
- Delete `node_modules` and `.pnpm-lock.yaml`
- Run `npm install` again
- Restart the dev server

### General Issues

**"Port already in use"**
- Windows: `netstat -ano | findstr :<port>`
- macOS/Linux: `lsof -i :<port>` then `kill -9 <PID>`

**"Still not working?"**
1. Check all console logs (both browser and terminal)
2. Try clearing browser cache (Ctrl+Shift+Delete)
3. Restart both servers
4. Verify all prerequisites are installed

## Next Steps

### Manual Testing
1. Test all product add/remove scenarios
2. Try checkout with different information
3. Test on mobile using browser DevTools
4. Check MongoDB for saved orders

### Prepare for Submission
1. Screenshots of:
   - Product page
   - Shopping cart
   - Checkout form
   - Order confirmation

2. Update documentation:
   - Note any modifications
   - Document any issues encountered
   - Include screenshots in README

3. Push to GitHub:
   - Initialize git repository
   - Create public repository
   - Push all code
   - Include README and this setup guide

## File Structure Reference

\`\`\`
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
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartView.jsx
│   │   │   └── CheckoutForm.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
└── README.md
\`\`\`

## Support

- MongoDB Atlas Help: [docs.mongodb.com](https://docs.mongodb.com)
- Express Documentation: [expressjs.com](https://expressjs.com)
- React Documentation: [react.dev](https://react.dev)
- Vite Guide: [vitejs.dev](https://vitejs.dev)

---

Happy shopping with Vibe Commerce! 🛒
