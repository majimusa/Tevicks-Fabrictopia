import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import OrderTracker from "./components/OrderTracker";
import AdminPanel from "./components/AdminPanel";
import { db } from "./firebase";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    (async () => {
      const snaps = await getDocs(collection(db, "products"));
      setProducts(snaps.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  const addToCart = p => {
    const exists = cart.find(i => i.id === p.id);
    exists ? setCart(cart.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i))
           : setCart([...cart, { ...p, quantity: 1 }]);
  };

  const removeFromCart = id => setCart(cart.filter(i => i.id !== id));

  const checkout = async () => {
    const doc = await addDoc(collection(db, "orders"), {
      items: cart,
      status: "Processing",
      createdAt: Timestamp.now()
    });
    setOrderId(doc.id);
    setCart([]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto p-6 grid grid-cols-3 gap-4">
            {products.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart}/>)}
          </div>
        }/>
        <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart} onCheckout={checkout}/>}/>
        <Route path="/track" element={<OrderTracker orderId={orderId}/>}/>
        <Route path="/admin" element={<AdminPanel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
