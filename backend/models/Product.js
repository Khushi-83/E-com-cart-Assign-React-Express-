import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Product", productSchema)
