"use client";

import { CheckCircle } from "lucide-react";
import "./OrderSuccess.css";

function OrderSuccess({ onContinue }) {
  return (
    <div className="order-success">
      <CheckCircle size={70} color="#22c55e" />
      <h2>Order Successful!</h2>
      <p>Thank you for shopping with Vibe Commerce 💙</p>
      <button className="black-btn" onClick={onContinue}>Continue Shopping</button>
    </div>
  );
}

export default OrderSuccess;
