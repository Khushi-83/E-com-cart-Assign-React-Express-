import express from "express"
import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

const router = express.Router()
const GUEST_ID = "guest"

// POST /api/cart - Add item to cart
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body

    if (!productId || !quantity) {
      return res.status(400).json({ error: "Missing productId or quantity" })
    }

    // Find product
    const product = await Product.findOne({ id: productId })
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    // Get or create cart
    let cart = await Cart.findOne({ userId: GUEST_ID })
    if (!cart) {
      cart = new Cart({ userId: GUEST_ID, items: [] })
    }

    // Check if item already in cart
    const existingItem = cart.items.find((item) => item.productId === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      })
    }

    // Calculate total
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cart.updatedAt = new Date()

    await cart.save()
    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/cart - Get cart items
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: GUEST_ID })

    if (!cart) {
      cart = new Cart({ userId: GUEST_ID, items: [], total: 0 })
      await cart.save()
    }

    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /api/cart/:id - Remove item from cart
router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params

    const cart = await Cart.findOne({ userId: GUEST_ID })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    cart.items = cart.items.filter((item) => item.productId !== productId)
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cart.updatedAt = new Date()

    await cart.save()
    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PATCH /api/cart/:id - Update item quantity
router.patch("/:productId", async (req, res) => {
  try {
    const { productId } = req.params
    const { quantity } = req.body

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" })
    }

    const cart = await Cart.findOne({ userId: GUEST_ID })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    const item = cart.items.find((item) => item.productId === productId)
    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" })
    }

    item.quantity = quantity
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cart.updatedAt = new Date()

    await cart.save()
    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
