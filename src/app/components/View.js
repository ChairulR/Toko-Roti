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
    <div className="min-h-screen bg-gray-100 justify-center max-w-screen-md mx-auto w-full">
      <div className="relative w-full h-[60vh] md:h-[50vh] lg:h-[40vh] flex items-center justify-center max-w-screen-md mx-auto">
        <button
          onClick={() => router.back()}
          className="fixed top-5 left-7 z-50 bg-white/70 hover:bg-white/90 backdrop-blur p-2 rounded-full shadow"
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
      <p className="text-sm text-gray-500 italic">{product.flavor}</p>
      <div className="flex justify-between items-center mt-2 bg-white p-3 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
        <p className="font-bold text-xl text-red-600">Rp{product.price.toLocaleString()}</p>
      </div>

        <div
          className="flex items-center justify-between mt-1 text-xl font-semibold text-gray-600 bg-yellow-50 border border-yellow-300 px-3 py-2 rounded-md shadow-sm transition-transform duration-200 hover:scale-102 cursor-pointer"
          onClick={() => {
            document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-yellow-600 flex items-center gap-2.5 mx-0 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-yellow-600" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.436 8.207 1.191-5.93 5.769 1.398 8.151-7.343-3.862-7.343 3.862 1.398-8.151-5.93-5.769 8.207-1.191z"/>
            </svg>
            {product.averageRating ? parseFloat(product.averageRating).toFixed(1) : "-"}  
          </span>
          <span className="text-gray-600 mx-0 text-sm">({product.reviewCount} ulasan)</span>
        </div>

        {/* Quantity */}
        <div className="flex justify-end items-center gap-5 mt-5">
          <button
            className="px-5 py-1 rounded-lg font-bold bg-white border border-black text-black shadow-md hover:bg-gray-400 transition active:scale-85 cursor-pointer hover:scale-108"
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
                setTotalPrice(product.price * (count - 1));
              }
            }}
          >
            -
          </button>

          <span className="text-lg font-bold relative">{count}</span>

          <button
            className="px-5 py-1 rounded-lg font-bold bg-black text-white shadow-md hover:bg-gray-400 transition active:scale-85 cursor-pointer hover:scale-108"
            onClick={() => {
              setCount(count + 1);
              setTotalPrice(product.price * (count + 1));
            }}
          >
            +
          </button>
        </div>

        {/* Notes */}
        <div className="mt-0">
          <label htmlFor="note" className="font-medium text-sm text-gray-700">
            Notes
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            id="note"
            placeholder="Tambahkan catatan di sini..."
            className="w-full mt-2 border border-gray-300 bg-gray-50 rounded-md p-3 text-sm min-h-[100px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        {/* Product Reviews Component with Pagination */}

      </div>

      {/* Tombol Beli Sekarang */}
      <div className="sticky bottom-10 z-35 bg-white px-4 pt-4 pb-6 shadow-lg">
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Total</span>
            <span className="text-lg font-bold">Rp{totalPrice.toLocaleString()}</span>
          </div>
          <button className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:scale-102 cursor-pointer transition-transform duration-200" onClick={fetchOrder}>
            Beli Sekarang
          </button>
        </div>
      </div>
      <div id="reviews" className="px-4 pt-4 pb-6">
        <ProductReviews comments={comment} itemsPerPage={5} />
      </div>
    </div>
  )
}
