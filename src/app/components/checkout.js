"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Loading from "@/app/components/loading"
import { useRouter, useSearchParams } from "next/navigation"
import { getProductById, getUserById, createOrder } from "@/app/lib/action"
import { useSession } from "next-auth/react"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [showQRISModal, setShowQRISModal] = useState(false);
  const id = parseInt(searchParams.get("id"), 10)
  const quantity = parseInt(searchParams.get("quantity"), 10)
  const note = searchParams.get("note") || ""

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  const [user, setUser] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("QRIS")

  useEffect(() => {
    async function fetchProduct() {
      if (!session || !session.user) return
      if (!id || !quantity || isNaN(id) || isNaN(quantity)) return

      setLoading(true)
      try {
        const result = await getProductById(id)
        const u = await getUserById(session.user.id)
        setUser(u)

        if (result.success) {
          setProduct(result.data)
          setTotalPrice(result.data.price * quantity)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, quantity, session])

  const handleCheckout = async () => {
    if (!user || !product) return;
    try {
      const result = await createOrder(user.id, id, quantity, paymentMethod);
      if (result.success) {
        if (paymentMethod === "QRIS") {
          setShowQRISModal(true); // tampilkan modal QR
        } else {
          router.push(`/order/history`);
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  if (!id || !quantity || isNaN(id) || isNaN(quantity)) {
    return <p className="p-4 text-red-500">Parameter tidak valid.</p>
  }

  if (loading) return <Loading message="Memuat produk..." />
  if (!product) return <p className="p-4 text-red-500">Produk tidak ditemukan.</p>

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1 className="checkout-title">Checkout</h1>
        <p className="checkout-subtitle">Konfirmasi pesanan sebelum pembayaran</p>
      </div>

      <div className="checkout-card">
        <Image
          src={`/images/${product.image}`}
          alt={product.name}
          width={100}
          height={100}
          className="checkout-img"
        />
        <div className="checkout-info">
          <p className="font-semibold">
            <strong>{product.name}</strong>
          </p>
          <p className="text-sm text-gray-600">
            Rasa: <span className="highlight">{product.flavor}</span>
          </p>
          <p className="text-sm text-gray-600">
           Jumlah: <span className="highlight">{quantity} item</span>
          </p>
          {note && (
            <p className="text-sm text-gray-600">
              Catatan: <span className="highlight">{note}</span>
            </p>
          )}
        </div>
      </div>

      <div className="checkout-summary">
        <div className="flex justify-between w-full px-6 mb-2">
          <span className="text-sm text-gray-600">Harga per item</span>
          <span className="text-sm">Rp{product.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between w-full px-6 font-semibold">
          <span>Total ({quantity} item)</span>
          <span>Rp{totalPrice.toLocaleString()}</span>
        </div>  
      </div>

      {/* Pilih Metode Pembayaran */}
      <section className="payment-method">
        <h3 className="payment-title">Pilih Metode Pembayaran</h3>
        <div className="payment-options">
          <button
            className={`payment-btn ${paymentMethod === "QRIS" ? "selected" : ""}`}
            onClick={() => setPaymentMethod("QRIS")}
          >
            📱 QRIS
          </button>
          <button
            className={`payment-btn ${paymentMethod === "COD" ? "selected" : ""}`}
            onClick={() => setPaymentMethod("COD")}
          >
            💵 COD (Bayar di Tempat)
          </button>
        </div>
      </section>
        {showQRISModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-80 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowQRISModal(false)}
              >
                ✖
              </button>
              <h2 className="text-lg font-bold text-center mb-2">🔗 Pembayaran QRIS</h2>
              <p className="text-sm text-center mb-4 text-gray-600">
                Scan kode QR berikut untuk menyelesaikan pembayaran.
              </p>
              <img
                src={`/api/generateQR?orderId=${id}`}
                alt="QRIS Payment"
                className="mx-auto w-48 h-48"
              />
              <p className="text-center text-sm font-medium text-gray-800 mt-4">
                Total: <span className="font-bold text-blue-600">Rp{totalPrice.toLocaleString()}</span>
              </p>
              <button
              onClick={() => {
                  setShowQRISModal(false);  
                  router.push("/order/history");
                }}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                ✅ Saya Sudah Membayar
              </button>

              <p className="text-xs text-center mt-4 text-gray-500">
                Pastikan untuk menyelesaikan pembayaran sebelum menutup popup ini.
              </p>
            </div>
          </div>
        )}

      <button className="checkout-btn" onClick={handleCheckout}>
        Lanjutkan Pembayaran
      </button>
    </div>
  )

}
