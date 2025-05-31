import { getProductById } from "@/app/lib/action";
import Image from "next/image";

export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const result = await getProductById(id);

  if (!result.success) {
    return <div className="text-center mt-10 text-red-500">Produk tidak ditemukan.</div>;
  }

  const product = result.data;
  const totalPrice = product.price;

  return (
    <div className="min-h-screen bg-white">
      {/* Gambar produk */}
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={`/images/${product.image}`}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Konten */}
      <div className="px-4 pt-4 pb-32"> {/* <-- Tambahkan pb-32 agar tidak ketabrak navbar */}
        <p className="text-sm text-gray-500">{product.flavor}</p>

        <div className="flex justify-between items-center mt-1">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="font-bold text-lg">Rp{product.price.toLocaleString()}</p>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-3">
          <button className="border px-3 py-1 rounded font-bold">-</button>
          <span>1</span>
          <button className="border px-3 py-1 rounded font-bold">+</button>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <span className="text-yellow-500">★ {product.averageRating ?? "-"} ({product.reviewCount} ulasan)</span>
        </div>

        {/* Catatan */}
        <div className="mt-5">
          <label htmlFor="note" className="font-medium text-sm">Notes</label>
          <textarea
            id="note"
            placeholder="Optional"
            className="w-full mt-1 border rounded-lg p-3 text-sm min-h-[80px]"
          />
        </div>
      </div>

      {/* Tombol Add Order */}
      <div className="bottom-4 left-4 right-4">
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Total</span>
            <span className="text-lg font-bold">Rp{totalPrice.toLocaleString()}</span>
          </div>
          <button className="w-full py-3 bg-black text-white rounded-lg font-semibold">
            Add Order
          </button>
        </div>
      </div>
    </div>
  );
}
