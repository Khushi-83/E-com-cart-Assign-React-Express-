"use client";

import React from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products, onAddToCart, loading }) {
  if (loading) return <p className="loading-message">Loading products...</p>;
  if (!products.length)
    return <p className="empty-message">No products available.</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          loading={loading}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
