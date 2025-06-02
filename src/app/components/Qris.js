"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function QRISPaymentPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.back(); // Kembali ke halaman sebelumnya
    }, 300); // Tunggu animasi selesai
  };

  useEffect(() => {
    if (!orderId) {
      handleClose(); // Tutup otomatis jika tidak ada ID
    }
  }, [orderId]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl relative"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-2">🔗 Pembayaran QRIS</h2>
            <p className="text-sm text-gray-600 mb-4">
              Scan kode QR berikut untuk menyelesaikan pembayaran.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <img
                src={`/api/generateQR?orderId=${orderId}`}
                alt="QRIS Payment"
                className="w-full max-w-[250px] mx-auto"
              />
            </div>
            <p className="text-sm text-gray-500">
              Pastikan untuk menyelesaikan pembayaran sebelum keluar dari halaman ini.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
