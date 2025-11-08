import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 129.99,
    description: "Premium sound quality",
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=Headphones",
    rating: 4.5,
  },
  {
    id: "2",
    name: "USB-C Cable",
    price: 19.99,
    description: "Fast charging cable",
    category: "Accessories",
    image: "https://via.placeholder.com/300x300?text=Cable",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Phone Case",
    price: 34.99,
    description: "Protective phone case",
    category: "Accessories",
    image: "https://via.placeholder.com/300x300?text=PhoneCase",
    rating: 4.3,
  },
  {
    id: "4",
    name: "Portable Charger",
    price: 45.99,
    description: "20000mAh power bank",
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=Charger",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Screen Protector",
    price: 12.99,
    description: "Tempered glass protector",
    category: "Accessories",
    image: "https://via.placeholder.com/300x300?text=ScreenProtector",
    rating: 4.4,
  },
  {
    id: "6",
    name: "Laptop Stand",
    price: 79.99,
    description: "Adjustable laptop stand",
    category: "Office",
    image: "https://via.placeholder.com/300x300?text=LaptopStand",
    rating: 4.7,
  },
  {
    id: "7",
    name: "Mechanical Keyboard",
    price: 159.99,
    description: "RGB mechanical keyboard",
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=Keyboard",
    rating: 4.9,
  },
  {
    id: "8",
    name: "Wireless Mouse",
    price: 49.99,
    description: "Ergonomic wireless mouse",
    category: "Electronics",
    image: "https://via.placeholder.com/300x300?text=Mouse",
    rating: 4.5,
  },
]

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()

    // If database is empty, seed with mock data
    if (products.length === 0) {
      const inserted = await Product.insertMany(mockProducts)
      return res.json(inserted)
    }

    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
