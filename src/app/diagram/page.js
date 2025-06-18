"use client";

import dynamic from "next/dynamic";

const MermaidRenderer = dynamic(() => import("@/app/components/MermaidRenderer"), {
  ssr: false,
});

export default function DiagramPage() {
  const chart = `
classDiagram
  %% ==== Kelas ====
  class User {
    +Int id
    +String name
    +String email
    +String address
    +Boolean isAdmin
    +Date createdAt
    +Date updatedAt
    +register()
    +login()
    +editProfile()
    +logout()
  }

  class Product {
    +Int id
    +String name
    +Int price
    +String image
    +String flavor
    +Int stock
    +Date createdAt
    +Date updatedAt
    +viewDetails()
  }

  class Order {
    +Int id
    +Int qty
    +OrderStatus status
    +PaymentMethod payment
    +OrderType orderType
    +Date createdAt
    +Date updatedAt
    +calculateTotal()
    +canReview()
  }

  class Comment {
    +Int id
    +String content
    +Int rate
    +Date createdAt
    +Date updatedAt
    +editReview()
  }

  class Banner {
    +Int id
    +String name
    +String image
    +Date createdAt
    +Date updatedAt
    +display()
  }

  class OrderStatus {
    PURCHASED
    PROCESS
    COMPLETED
    CANCELLED
  }

  class PaymentMethod {
    QRIS
    COD
  }

  class OrderType {
    PICKUP
    DELIVERY
  }

  %% ==== Relasi dan Penjelasan ====
  User "1" --> "many" Order : melakukan
  User "1" --> "many" Comment : menulis
  User --> Banner : melihat

  Product "1" --> "many" Order : dipesan
  Product "1" --> "many" Comment : diulas

  Order --> Product : berisi
  Order --> Comment : bisa diulas

  Comment --> Order : ditulis untuk
  Comment --> Product : tentang
  Comment --> User : oleh

  %% ==== Fungsi Utama di Tiap Entitas ====
  %% Kelas User: register, login, editProfile, logout
  %% Kelas Order: calculateTotal, canReview
  %% Kelas Product: viewDetails
  %% Kelas Banner: display
  %% Kelas Comment: editReview

  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-yellow-200">
        <div className="mb-6 border-b border-yellow-300 pb-4">
          <h1 className="text-3xl font-bold text-yellow-700">📐 Diagram Kelas - Toko Roti</h1>
          <p className="text-gray-600 mt-1">Berikut adalah visualisasi hubungan antar entitas dalam sistem.</p>
        </div>

        <div className="overflow-auto bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[80vh]">
          <MermaidRenderer chart={chart} />
        </div>
      </div>
    </div>
  );
}
