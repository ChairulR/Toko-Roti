"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const router = useRouter();

  const [orderHistory] = useState([
    { name: "Roti Tawar", date: "27 Mei 2025", status: "Selesai" },
    { name: "Croissant", date: "25 Mei 2025", status: "Diproses" },
    { name: "Donat Coklat", date: "24 Mei 2025", status: "Dibatalkan" },
  ]);

  const getStatusInfo = (status) => {
    const lower = status.toLowerCase();
    if (lower === "selesai") return { icon: "✅", color: "text-green-600" };
    if (lower === "diproses") return { icon: "⏳", color: "text-yellow-500" };
    if (lower === "dibatalkan") return { icon: "❌", color: "text-red-600" };
    return { icon: "ℹ️", color: "text-gray-500" };
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-4 sm:p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Riwayat Pembelian
      </motion.h2>

      {orderHistory.length === 0 ? (
        <motion.p
          className="text-center text-gray-500 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Belum ada riwayat pembelian.
        </motion.p>
      ) : (
        <div className="space-y-4">
          {orderHistory.map((item, index) => {
            const statusInfo = getStatusInfo(item.status);

            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-4 shadow-md border-l-4 border-black flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:shadow-lg transition"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Tanggal: {item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xl ${statusInfo.color}`}>{statusInfo.icon}</span>
                  <span className={`font-medium ${statusInfo.color}`}>{item.status}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
