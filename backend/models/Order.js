import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  userId: { type: String, default: "guest" },
  name: String,
  email: String,
  items: Array,
  total: Number,
  timestamp: { type: Date, default: Date.now },
})

export default mongoose.model("Order", orderSchema)
