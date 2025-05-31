"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const [quantity, setQuantity] = useState(1);
  const [pickupTime, setPickupTime] = useState("asap"); // "asap" or "later"
  const [activeTab, setActiveTab] = useState("pickup"); // "pickup" or "delivery"
  const router = useRouter();

  const product = {
    id: 1,
    name: "Roti Sisir Mentega Cokelat",
    price: 5000,
    image: "/images/roti.jpg",
  };

  const handleCheckout = () => {
    alert("Pesanan berhasil!");
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      {/* Produk */}
      <div className="flex items-center mb-4 gap-4 border p-4 rounded-lg">
        <Image src={product.image} alt={product.name} width={60} height={60} className="rounded-md" />
        <div className="flex-1">
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm">Rp. {product.price.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-1">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 border rounded">-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1 border rounded">+</button>
          </div>
        </div>
        <button className="text-red-500 text-sm">🗑</button>
      </div>

      <button onClick={() => router.push("/")} className="text-sm text-gray-500 mb-4 underline">
        + Add Order
      </button>

      {/* Tabs Pickup / Delivery */}
      <div className="flex border-b mb-4">
        <button onClick={() => setActiveTab("pickup")} className={`flex-1 py-2 font-medium ${activeTab === "pickup" ? "border-b-2 border-black" : "text-gray-400"}`}>
          Pickup
        </button>
        <button onClick={() => setActiveTab("delivery")} className={`flex-1 py-2 font-medium ${activeTab === "delivery" ? "border-b-2 border-black" : "text-gray-400"}`}>
          Delivery
        </button>
      </div>

      {/* Pickup Options */}
      {activeTab === "pickup" && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">*We are open from 08.00 - 20.00 WIB</p>
          <div className="mt-2">
            <label className="block mt-2">
              <input
                type="radio"
                name="pickup"
                value="asap"
                checked={pickupTime === "asap"}
                onChange={() => setPickupTime("asap")}
              />
              <span className="ml-2">As Soon as Possible (Now - 10 min)</span>
            </label>
            <label className="block mt-2">
              <input
                type="radio"
                name="pickup"
                value="later"
                checked={pickupTime === "later"}
                onChange={() => setPickupTime("later")}
              />
              <span className="ml-2">Later (Schedule Pick Up)</span>
            </label>
          </div>
        </div>
      )}

      {/* Payment Method */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <p className="font-medium">Payment Method</p>
          <button className="text-sm text-gray-500">Gopay (Rp85.000)</button>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <p>Price ({quantity} item)</p>
          <p>Rp. {(product.price * quantity).toLocaleString()}</p>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>Rp. {(product.price * quantity).toLocaleString()}</p>
        </div>
        <button onClick={handleCheckout} className="w-full mt-4 py-3 bg-black text-white rounded-lg font-semibold">
          Checkout
        </button>
      </div>
    </div>
  );
}
