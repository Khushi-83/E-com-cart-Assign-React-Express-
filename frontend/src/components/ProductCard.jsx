"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card clean-card">
      <div className="product-image-wrapper">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="product-image"
          onError={(e) => (e.target.style.display = "none")}
        />
        {!product.image && <div className="image-placeholder">Product Image</div>}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-price-stock">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="stock-badge">In Stock</span>
        </div>

        <div className="product-actions">
          <div className="quantity-control">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>
              <Plus size={14} />
            </button>
          </div>

          <button
            className="add-to-cart"
            onClick={() => onAddToCart(product.id, quantity)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
