"use client";

import { useState, useEffect } from "react";
import Loading from "@/app/components/loading";
import Link from "next/link";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const { getUserById } = await import("@/app/lib/action");
        const userId = 1; // Gantilah dengan user session di produksi
        const result = await getUserById(userId);
        if (result && result.orders) {
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

  if (loading) return <Loading message="Loading history" />;
  if (history.length === 0) return <p className="text-center text-gray-500 mt-10">Belum ada riwayat pembelian.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📜 Riwayat Pembelian</h2>

      <ul className="flex flex-col gap-4">
        {history.map((order) => (
          <li
            key={order.id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">{order.product.name}</p>
              <span className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="text-sm text-gray-700">
              <p>Status: <span className="font-medium">{order.status}</span></p>
              <p>Harga: Rp{order.product.price.toLocaleString()}</p>
              <p className="mt-1">
                💰 Total: <strong>Rp{order.product.price.toLocaleString()}</strong>
              </p>
            </div>

            <div className="mt-3">
              <Link
                href={`/order/review/${order.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                🔍 Beri Rating
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
