"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./CheckoutForm.css";

function CheckoutForm({ cartItems, cartTotal, onCancel, onOrderSuccess, apiBaseUrl }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${apiBaseUrl}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cartItems }),
      });

      setLoading(false);
      onOrderSuccess(); // show success UI
    } catch {
      setLoading(false);
      alert("Error during checkout");
    }
  };

  return (
    <div className="checkout-container">
      <button className="back-btn" onClick={onCancel}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Full Name
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            <label>
              Email Address
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <button type="submit" className="black-btn" disabled={loading}>
              {loading ? "Processing..." : `Pay $${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.productId} className="summary-item">
              <span>{item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total:</strong> <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
