"use client"
import { notFound, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getProductById } from "@/app/lib/action"
import Loading from "@/app/components/loading"

export default function Page() {
  const { id } = useParams()
  const [showCheckout, setShowCheckout] = useState(false)
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState("")
  const router = useRouter()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const r = await getProductById(id)
      if (!r.success) {
        notFound()
      } else {
        setProduct(r.data)
        setReviews(r.data.comments || [])
      }
    } catch (error) {
      console.error("Error fetching product:", error)
      notFound()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  if (loading) {
    return <Loading message="Loading product..." />
  }

  if (!product) {
    return notFound()
  }

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length : 0

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const formatPrice = (price) => {
    return `Rp${price.toLocaleString("id-ID")}`
  }

  const totalPrice = product.price * quantity

  return (
    <div className="min-h-screen bg-white max-w-sm mx-auto">
        {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <button onClick={() => router.back()}>
          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-medium">Detail</h1>
      </div>

      {/* Product Image */}
      <div className="relative h-64 bg-gray-100">
        <Image src={`/images/${product.image}`} alt={product.name} fill className="object-cover" />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        {/* Category and Basic Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded text-xs">
                {product.category || "Food"}
              </span>
              <h2 className="text-lg font-semibold mt-2 mb-1">{product.name}</h2>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{formatPrice(product.price)}</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-3 py-1 text-sm font-medium border-l border-r border-gray-300">{quantity}</span>
                  <button
                    className="h-8 w-8 flex items-center justify-center hover:bg-gray-50"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-gray-600">({reviews.length})</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">Ratings and reviews</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>
        )}

        {/* Notes Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Notes</label>
          <textarea
            placeholder="Optional"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full min-h-[80px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-600">Total</span>
            <div className="text-xl font-bold">{formatPrice(totalPrice)}</div>
          </div>
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            onClick={() => setShowCheckout(true)}
          >
            Add Order
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Produk:</span>
                <span className="font-medium">{product.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Harga:</span>
                <span className="font-medium">{formatPrice(product.price)}</span>
              </div>

              {/* Quantity Controls in Modal */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jumlah:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="h-8 w-8 flex items-center justify-center hover:bg-gray-50"
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    className="w-12 text-center border-l border-r border-gray-300 h-8 text-sm"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  />
                  <button
                    className="h-8 w-8 flex items-center justify-center hover:bg-gray-50"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total:</span>
                <span>{formatPrice(product.price * quantity)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Konfirmasi Pembayaran
              </button>
              <button
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={() => setShowCheckout(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-24"></div>
    </div>
  )
}
