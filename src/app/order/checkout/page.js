"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/app/components/loading";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const quantity = parseInt(searchParams.get("quantity")) || 1;
  const note = searchParams.get("note") || "";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const { getProductById } = await import("@/app/lib/action");
        const result = await getProductById(id);
        if (result.success) {
          setProduct(result.data);
          setTotalPrice(result.data.price * quantity);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id, quantity]);

  if (loading) return <Loading message="Memuat produk..." />;
  if (!product) return <p className="p-4 text-red-500">Produk tidak ditemukan.</p>;

  return (
    <div className="checkout-page">
      {/* Header */}
      <div className="checkout-header">
        <h1 className="checkout-title">Checkout</h1>
        <p className="checkout-subtitle">Konfirmasi pesanan sebelum pembayaran</p>
      </div>

      {/* Info Produk */}
      <div className="checkout-card">
        <Image
          src={`/images/${product.image}`}
          alt={product.name}
          width={100}
          height={100}
          className="checkout-img"
        />
        <div className="checkout-info">
          <p className="font-semibold">📌 <strong>{product.name}</strong></p>
          <p className="text-sm text-gray-600">🍞 Rasa: <span className="highlight">{product.flavor}</span></p>
          <p className="text-sm text-gray-600">📦 Jumlah: <span className="highlight">{quantity} item</span></p>
          {note && <p className="text-sm text-gray-600">📝 Catatan: <span className="highlight">{note}</span></p>}
        </div>
      </div>

      {/* Ringkasan Harga */}
      <div className="checkout-summary">
        <div className="flex justify-between w-full px-6 mb-2">
          <span className="text-sm text-gray-600">💰 Harga per item</span>
          <span className="text-sm">Rp{product.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between w-full px-6 font-semibold">
          <span>💳 Total ({quantity} item)</span>
          <span>Rp{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Tombol Konfirmasi */}
      <button className="checkout-btn">Konfirmasi Pembayaran</button>
    </div>
  );
}