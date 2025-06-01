"use client";
import { useSearchParams } from "next/navigation";

export default function QRISPaymentPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div className="qris-payment-page text-center">
      <h2>🔗 Pembayaran via QRIS</h2>
      <p>Scan kode QR berikut untuk menyelesaikan pembayaran.</p>
      <img src={`/api/generateQR?orderId=${orderId}`} alt="QRIS Payment" />

      <p>Pastikan untuk menyelesaikan pembayaran sebelum keluar dari halaman ini.</p>
    </div>
  );
}