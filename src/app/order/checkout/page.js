"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/app/lib/action"; // Fetch produk dari database

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const quantity = searchParams.get("quantity");
  const note = searchParams.get("note");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const result = await getProductById(productId);
          if (result.success) {
            setProduct(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading checkout...</p>;
  }

  if (!product) {
    return <p>Produk tidak ditemukan!</p>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-item">
        <p><strong>Produk:</strong> {product.name}</p>
        <p><strong>Harga:</strong> Rp{product.price.toLocaleString()}</p>
        <p><strong>Jumlah:</strong> {quantity}</p>
        {note && <p><strong>Catatan:</strong> {note}</p>}
      </div>

      <button className="confirm-btn">Konfirmasi Pembayaran</button>
    </div>
  );
}