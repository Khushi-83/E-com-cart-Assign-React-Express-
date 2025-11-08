"use client";

import { ArrowLeft, Trash2 } from "lucide-react";
import "./CartView.css";

function CartView({ cartItems, cartTotal, onRemoveItem, onUpdateQuantity, onViewProducts, onCheckout }) {
  return (
    <div className="cart-container">
      <div className="cart-header">
        <button className="back-btn" onClick={onViewProducts}>
          <ArrowLeft size={18} /> Continue Shopping
        </button>
        <h2>Your Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="black-btn" onClick={onViewProducts}>Browse Products</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-card">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity">
                    <button onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button className="remove-btn" onClick={() => onRemoveItem(item.productId)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <strong>Total:</strong>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>
            <button className="black-btn" onClick={onCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartView;
