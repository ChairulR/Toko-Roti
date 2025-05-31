"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryComponent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders") 
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="history-container">
      <h1>Riwayat Pembelian</h1>

      {orders.length === 0 ? (
        <p className="no-orders">Belum ada riwayat pembelian.</p>
      ) : (
        <div className="history-list">
          {orders.map((order) => (
            <div key={order.id} className="history-item">
              <p className="order-name"><strong>Produk:</strong> {order.productName}</p>
              <p className="order-date"><strong>Tanggal:</strong> {order.date}</p>
              <p className="order-price"><strong>Total:</strong> Rp{order.totalPrice}</p>
              <p className="order-status"><strong>Status:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}