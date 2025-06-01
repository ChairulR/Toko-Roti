"use client";

import Loading from "@/app/components/loading";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const [product, setProduct] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");

  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const fetching = async () => {
    setLoading(true);
    try {
      const { getProductById } = await import("@/app/lib/action");
      const result = await getProductById(id);
      if (result.success) {
        setProduct(result.data);
        setTotalPrice(result.data.price);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrder = () => {
    const encodedNote = encodeURIComponent(note);
    router.push(`/order/checkout?id=${id}&quantity=${count}&note=${encodedNote}`);
  };

  useEffect(() => {
    fetching();
  }, [id]);

  if (loading) {
    return <Loading message="Loading product" />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Gambar Produk */}
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={`/images/${product.image}`}
          alt={product.name}
          fill
          className="object-cover"
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
                const newCount = count - 1;
                setCount(newCount);
                setTotalPrice(product.price * newCount);
              }
            }}
          >
            -
          </button>
          <span>{count}</span>
          <button
            className="border px-3 py-1 rounded font-bold"
            onClick={() => {
              const newCount = count + 1;
              setCount(newCount);
              setTotalPrice(product.price * newCount);
            }}
          >
            +
          </button>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <span className="text-yellow-500">
            ★ {product.averageRating ?? "-"} ({product.reviewCount} ulasan)
          </span>
        </div>

        {/* Review */}
        {product.comments.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Review Pengguna</h3>
            {product.comments.map((c) => (
              <div key={c.id} className="mb-3 border-b pb-2">
                <p className="font-medium">{c.userName}</p>
                <p className="text-yellow-500 text-sm">
                  {"★".repeat(c.rate)} <span className="text-gray-500">({c.rate})</span>
                </p>
                <p className="text-sm text-gray-700">{c.content}</p>
              </div>
            ))}
          </div>
        )}

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
      </div>

    {/* Tombol Beli Sekarang */}
      <div className="bottom-4 mb-12 left-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Total</span>
            <span className="text-lg font-bold">
              Rp{totalPrice.toLocaleString()}
          </span>
        </div>
        <button
          className="checkout-btn"
          onClick={fetchOrder}
        >
          Beli Sekarang
        </button>
      </div>
    </div>
    </div>
  );
}
