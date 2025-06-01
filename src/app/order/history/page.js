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
        const { getUserById } = await import("@/app/lib/action");
        const userId = 1; // Gantilah dengan ID user yang sedang login
        const result = await getUserById(userId);

        if (result) {
          setHistory(result.orders);
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
            <p><strong>{order.product.name}</strong></p>
            <p>🗓 {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>📦 Jumlah: {order.qty}</p>
            <p>💰 Total: Rp{(order.product.price * order.qty).toLocaleString()}</p>
            <p>Status: <strong>{order.status}</strong></p>
            <button className="history-btn">🔍 Beri Rating</button>
          </li>
        ))}
      </ul>
    </div>
  );
}