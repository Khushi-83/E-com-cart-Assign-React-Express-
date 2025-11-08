"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, ArrowLeft, CheckCircle } from "lucide-react";
import ProductGrid from "./components/ProductGrid";
import CartView from "./components/CartView";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [currentView, setCurrentView] = useState("products"); // products | cart | checkout | success
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // 🛍️ Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Error loading products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🧺 Fetch cart
  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/cart`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // ➕ Add item to cart
  const handleAddToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to add item");
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      setError("Error adding to cart: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ❌ Remove item
  const handleRemoveFromCart = async (productId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/cart/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove item");
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      setError("Error removing item: " + err.message);
    }
  };

  // 🔄 Update item quantity
  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const res = await fetch(`${API_BASE_URL}/cart/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      setError("Error updating quantity: " + err.message);
    }
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ✅ Success handler
  const handleOrderSuccess = () => {
    setCart([]);
    setCurrentView("success");
  };

  return (
    <div className="app">
      {/* 🧭 Header */}
      <header className="header">
        <h1 className="logo">🛍️ Vibe Commerce</h1>

        {currentView !== "products" && currentView !== "success" ? (
          <button className="cart-toggle" onClick={() => setCurrentView("products")}>
            <ArrowLeft size={22} /> Back
          </button>
        ) : (
          <button
            className="cart-toggle"
            onClick={() => setCurrentView(currentView === "cart" ? "products" : "cart")}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        )}
      </header>

      {/* ⚠️ Error Message */}
      {error && <div className="error">{error}</div>}

      {/* 🧩 Main Content */}
      <main className="main">
        {currentView === "products" && (
          <ProductGrid products={products} onAddToCart={handleAddToCart} loading={loading} />
        )}

        {currentView === "cart" && (
          <CartView
            cartItems={cart}
            cartTotal={cartTotal}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={() => setCurrentView("checkout")}
          />
        )}

        {currentView === "checkout" && (
          <CheckoutForm
            cartItems={cart}
            cartTotal={cartTotal}
            apiBaseUrl={API_BASE_URL}
            onCancel={() => setCurrentView("cart")}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {currentView === "success" && (
          <div className="success-screen">
            <CheckCircle size={80} color="#22c55e" />
            <h2>Order Successful!</h2>
            <p>Thank you for shopping with Vibe Commerce 💙</p>
            <button className="checkout-btn" onClick={() => setCurrentView("products")}>
              Continue Shopping
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
