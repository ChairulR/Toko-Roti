"use client";
import { useState } from "react";

export default function CheckoutPage({ product, quantity }) {
  const [checkoutStep, setCheckoutStep] = useState("cart"); // "cart" -> "confirm" -> "payment"

  return (
    <div className="payment-container">
      {checkoutStep === "cart" && (
        <div className="payment-cart">
          <h2>Keranjang Belanja</h2>
          <button onClick={() => setCheckoutStep("confirm")}>Lanjutkan</button>
        </div>
      )}

      {checkoutStep === "confirm" && (
        <div className="payment-confirm">
          <h2>Konfirmasi Pesanan</h2>
          <button onClick={() => setCheckoutStep("payment")}>Bayar Sekarang</button>
        </div>
      )}

      {checkoutStep === "payment" && (
        <div className="payment">
          <h2>Pilih Metode Pembayaran</h2>
          <select>
            <option value="transfer">Transfer Bank</option>
            <option value="ewallet">E-Wallet</option>
            <option value="cod">Bayar di Tempat</option>
          </select>
          <button>Konfirmasi Pembayaran</button>
        </div>
      )}
    </div>
  );
}
