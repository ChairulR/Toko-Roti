"use client";
import { useState, useEffect } from "react";
import Loading from "@/app/components/loading";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const { getUserOrderHistory } = await import("@/app/lib/action");
        const result = await getUserOrderHistory();

        if (result.success) {
          setHistory(result.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  if (loading) {
    return <Loading message="Loading product" />;
  }
  
  if (history.length === 0) return <p className="text-center text-gray-500">Belum ada riwayat pembelian.</p>;

  return (
    <div className="history-page">
      <h2 className="history-title">📜 Riwayat Pembelian</h2>
      <ul className="history-list">
        {history.map((order) => (
          <li key={order.id} className="history-item">
            <p><strong>{order.productName}</strong></p>
            <p>🗓 {order.date}</p>
            <p>💰 Rp{order.totalPrice.toLocaleString()}</p>
            <button className="history-btn">🔍 Lihat Detail</button>
          </li>
        ))}
      </ul>
    </div>
  );
}