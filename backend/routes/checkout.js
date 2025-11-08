import express from "express"
import Cart from "../models/Cart.js"
import Order from "../models/Order.js"

const router = express.Router()
const GUEST_ID = "guest"

// POST /api/checkout - Process checkout
router.post("/", async (req, res) => {
  try {
    const { name, email, cartItems } = req.body

    if (!name || !email || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`

    // Create order record
    const order = new Order({
      orderNumber,
      userId: GUEST_ID,
      name,
      email,
      items: cartItems,
      total,
      timestamp: new Date(),
    })

    await order.save()

    // Clear cart
    await Cart.findOneAndUpdate({ userId: GUEST_ID }, { items: [], total: 0, updatedAt: new Date() })

    // Return mock receipt
    res.json({
      success: true,
      orderNumber,
      name,
      email,
      items: cartItems,
      total,
      timestamp: new Date(),
      message: "Order placed successfully!",
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
