import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import checkoutRoutes from "./routes/checkout.js"; // We'll verify this below

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 🧩 Middleware
app.use(express.json());

// ✅ Allow frontend connections
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// 🧩 MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// 🧩 Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// 💡 Temporary fallback checkout route (for testing checkout)
app.post("/api/checkout", (req, res) => {
  const { name, email, cartItems } = req.body;

  // Validation check
  if (!name || !email || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: "Invalid checkout details." });
  }

  console.log("🛍️ Checkout request received:", { name, email, cartItems });

  // Simulated successful checkout
  return res.status(200).json({
    message: "✅ Order Successful!",
    orderNumber: "ORD" + Date.now(),
    total: cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
  });
});

// 🩺 Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "✅ Server is running fine!" });
});

// ⚠️ 404 Fallback (for undefined routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ⚠️ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
