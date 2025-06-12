import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const snaps = await getDocs(collection(db, "orders"));
      setOrders(snaps.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Admin Panel</h2>
      {orders.map(o => (
        <div key={o.id} className="mb-4 border p-2">
          <p>Order {o.id}: {o.status}</p>
          <button className="mr-2 bg-yellow-400 px-2" onClick={() => updateStatus(o.id, "Shipped")}>Mark Shipped</button>
          <button className="bg-green-500 px-2" onClick={() => updateStatus(o.id, "Delivered")}>Mark Delivered</button>
        </div>
      ))}
    </div>
  );
}
