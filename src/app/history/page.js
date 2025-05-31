"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function HistoryPage() {
  // Data dummy untuk riwayat pembelian
  const router = useRouter();

  const [orderHistory] = useState([
    { name: "Roti Tawar", date: "27 Mei 2025", status: "Selesai" },
    { name: "Croissant", date: "25 Mei 2025", status: "Diproses" },
    { name: "Donat Coklat", date: "24 Mei 2025", status: "Dibatalkan" },
  ]);

  return (
    <div className="history-container">
      <h2>Riwayat Pembelian</h2>

      {orderHistory.length === 0 ? (
        <p className="no-orders">Belum ada riwayat pembelian.</p>
      ) : (
        <div className="history-list">
          {orderHistory.map((item, index) => (
            <div key={index} className="history-item">
              <p className="producthist-name"><strong>Produk:</strong> {item.name}</p>
              <p className="date"><strong>Tanggal:</strong> {item.date}</p>
              <p className="status"><strong>Status:</strong> {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}