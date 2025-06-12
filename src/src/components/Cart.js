import React from "react";

export default function Cart({ cart, onCheckout, onRemove }) {
  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Cart</h2>
      {cart.map(p => (
        <div key={p.id} className="flex justify-between mb-2">
          <span>{p.name} x {p.quantity}</span>
          <button onClick={() => onRemove(p.id)} className="text-red-500">Remove</button>
        </div>
      ))}
      <p>Total: ₦{total}</p>
      <button className="mt-4 bg-green-600 text-white px-4 py-2" onClick={onCheckout}>Checkout</button>
    </div>
  );
}
