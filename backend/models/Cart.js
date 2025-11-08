import mongoose from "mongoose"

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  quantity: Number,
  image: String,
})

const cartSchema = new mongoose.Schema({
  userId: { type: String, default: "guest" },
  items: [cartItemSchema],
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("Cart", cartSchema)
