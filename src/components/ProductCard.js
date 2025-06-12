import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border p-4">
      <img src={product.image} alt={product.name} className="h-40"/>
      <h3 className="font-bold">{product.name}</h3>
      <p>₦{product.price}</p>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={() => onAdd(product)}>
        Add to Cart
      </button>
    </div>
  );
}
