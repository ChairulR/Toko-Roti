"use client";

import { useState, useEffect } from "react";
import Loading from "@/app/components/loading";
import Link from "next/link";
import { getUserById } from "@/app/lib/action";;
import { formatterCurrency } from "../lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { cancelOrder } from "@/app/lib/action";

export default function HistoryPage({ userId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Apakah kamu yakin ingin membatalkan pesanan ini?");
    if (!confirmCancel) return;

    try {
      const result = await cancelOrder(orderId);
      console.log("Cancel order response:", result);

      if (result.success) {
        alert("Pesanan berhasil dibatalkan!");
        window.location.reload();
      } else {
        alert("Gagal membatalkan pesanan, silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Terjadi kesalahan, silakan coba lagi.");
    }
  };


  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const result = await getUserById(userId);
        console.log("Fetched user history:", result);
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
  if (history.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">
        Belum ada riwayat pembelian.
      </p>
    );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📜 Riwayat Pembelian</h2>

      <ul className="flex flex-col gap-4">
        {history.map((order) => (
          <li
            key={order.id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex gap-4"
          >

            {/* Gambar Produk */}
            <div className="mt-5 mx-3 w-20 h-36 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center relative">
              <Image
                src={`/images/${order.product.image}`}
                alt={order.product.name}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            {/* Konten Info Produk */}
            <div className="flex-1 text-justify">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">{order.product.name}</p>
                <span className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1 leading-relaxed break-words">
                <p className="text-justify">
                  <span className="font-medium">Status:</span> {order.status}
                </p>
                <p className="text-justify">
                  <span className="font-medium">Harga:</span>{" "}
                  {formatterCurrency.format(order.product.price)}
                </p>
                <p className="text-justify">
                  <span className="font-medium">Jumlah:</span> {order.qty}
                </p>
                <p>
                  <strong>Total: </strong>{" "}
                  <strong>
                    {formatterCurrency.format(order.product.price * order.qty)}
                  </strong>
                </p>
                <p className="text-justify">
                  <span className="font-medium">Metode Pembayaran:</span>{" "}
                  <span className={order.payment === "QRIS" ? "text-blue-600 font-semibold" : "text-green-600 font-semibold"}>
                    {order.payment === "QRIS" ? "📱 QRIS" : "💵 COD"}
                  </span>
                  {" • "}
                  <span className={order.orderType === "DELIVERY" ? "text-purple-600 font-semibold" : "text-orange-600 font-semibold"}>
                    {order.orderType === "DELIVERY" ? "🚚 Delivery" : "🏪 Pickup"}
                  </span>
                </p>
              </div>

              {/* Bagian Review atau Status */}
              {order.comments && order.comments.length > 0 ? (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2.5 text-sm shadow-sm leading-tight">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-green-700 text-xs flex items-center gap-1">
                      ⭐ {order.comments[0].rate} / 5
                    </p>
                    <span className="text-[10px] px-2 py-0.5 bg-green-200 text-green-900 rounded-full">
                      ✅ Sudah direview
                    </span>
                  </div>
                  {order.comments[0].content && (
                    <p className="text-gray-700 italic mt-1.5 text-xs text-justify break-words">
                      "{order.comments[0].content}"
                    </p>
                  )}
                </div>

              ) : order.status === "COMPLETED" || order.status === "CANCELLED"? (
                <div className="mt-4 flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => router.push(`/view/${order.product.id}?quantity=${order.qty}`)}
                    className="px-5 py-2 text-xs font-semibold text-white bg-blue-500 rounded-md shadow hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  >
                    🔄 Beli Lagi
                  </button>
                   {(order.status === "COMPLETED") && (
                  <Link
                    href={`/order/review/${order.id}`}
                    className="px-3 py-2 text-xs font-semibold text-white bg-yellow-600 rounded-md shadow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  >
                    ⭐ Beri Rating
                  </Link>
                   )}
                </div>
              ) : (
              <div className="mt-4 flex flex-wrap justify-between items-center gap-2">
                {(order.status === "PURCHASED" || order.status === "PROCESS") && (
                  <button
                    onClick={() => router.push(`/order/track/${order.id}`)}
                    className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                  >
                    📍 Lacak Pesanan
                  </button>
                )}
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-red-600 rounded-md shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                >
                  ❌ Batalkan Pesanan
                </button>
                {/*<button
                  disabled
                  className="px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-100 rounded-md shadow cursor-not-allowed"
                >
                  ⭐ Hanya bisa di-review saat COMPLETED
                </button>*/}
              </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}