"use client"

import Loading from "@/app/components/loading"
import ProductReviews from "@/app/components/ProductReview"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getProductById } from "@/app/lib/action"

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [product, setProduct] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(1)
  const [note, setNote] = useState("")
    const [comment, setComment] = useState("")
  const id = Number.parseInt(params.id, 10)

  const fetching = async () => {
    setLoading(true)
    try {

      const result = await getProductById(parseInt(id, 10))
      if (result.success) {
        setProduct(result.data)
        setTotalPrice(result.data.price)
        setComment(result.data.comments || [])
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrder = () => {
    const encodedNote = encodeURIComponent(note)
    router.push(`/order/checkout?id=${id}&quantity=${count}&note=${encodedNote}`)
  }

  useEffect(() => {
    fetching()
  }, [id])

  if (loading) {
    return <Loading message="Loading product" />
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full aspect-[4/3] md:aspect-[3/2]">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/70 hover:bg-white/90 backdrop-blur p-2 rounded-full shadow"
        >
          <span className="text-lg">❌</span>
        </button>

        <Image
          src={`/images/${product.image}`}
          alt={product.name}
          fill
          className="object-cover rounded-b-2xl"
          priority
        />
      </div>

      {/* Konten Produk */}
      <div className="px-4 pt-4 pb-32">
        <p className="text-sm text-gray-500">{product.flavor}</p>

        <div className="flex justify-between items-center mt-1">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="font-bold text-lg">Rp{product.price.toLocaleString()}</p>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-3">
          <button
            className="border px-3 py-1 rounded font-bold"
            onClick={() => {
              if (count > 1) {
                const newCount = count - 1
                setCount(newCount)
                setTotalPrice(product.price * newCount)
              }
            }}
          >
            -
          </button>
          <span>{count}</span>
          <button
            className="border px-3 py-1 rounded font-bold"
            onClick={() => {
              const newCount = count + 1
              setCount(newCount)
              setTotalPrice(product.price * newCount)
            }}
          >
            +
          </button>
        </div>

        <div className="flex items-center mt-3 text-sm text-gray-500">
          <span className="text-yellow-500">
            ★ {product.averageRating ?? "-"} ({product.reviewCount} ulasan)
          </span>
        </div>

        {/* Notes */}
        <div className="mt-5">
          <label htmlFor="note" className="font-medium text-sm">
            Notes
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            id="note"
            placeholder="Optional"
            className="w-full mt-1 border rounded-lg p-3 text-sm min-h-[80px]"
          />
        </div>

        {/* Product Reviews Component with Pagination */}

      </div>

      {/* Tombol Beli Sekarang */}
      <div className="sticky bottom-0 z-35 bg-white px-4 pt-4 pb-6 border-t">
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Total</span>
            <span className="text-lg font-bold">Rp{totalPrice.toLocaleString()}</span>
          </div>
          <button className="w-full py-3 bg-black text-white rounded-lg font-semibold" onClick={fetchOrder}>
            Beli Sekarang
          </button>
        </div>
      </div>
      <div className="px-4 pt-4 pb-6">
      <ProductReviews  comments={comment} itemsPerPage={5}/>
</div>
    </div>
  )
}
