import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function OrderTracker({ orderId }) {
  const [status, setStatus] = useState("loading...");
  
  useEffect(() => {
    if (!orderId) return;
    const unsub = onSnapshot(doc(db, "orders", orderId), snap => {
      if (snap.exists()) setStatus(snap.data().status);
      else setStatus("Order not found");
    });
    return unsub;
  }, [orderId]);

  return (
    <div>
      <h2>Order Status</h2>
      <p>{status}</p>
    </div>
  );
}
