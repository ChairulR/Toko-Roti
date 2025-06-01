import React from "react";
import OrderTrack from "../../../components/order-tracking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { getOrderById, getProductById, getUserById } from "@/app/lib/action";

// const product = {
//   id: 1,
//   name: "Chocolate Cake",
//   price: 5000,
//   image: "/placeholder.svg?height=40&width=40",
//   flavor: "sweet",
//   reviews: 10,
// };

// const user = {
//   id: 1,
//   name: "Bob Biki Mentega Cokelat",
// };

// const order = {
//   id: 1,
//   userId: 1,
//   productId: 1,
//   rating: 5,
//   status: "COMPLETED",
//   createdAt: "2023-10-01T10:00:00Z",
//   updatedAt: "2023-10-01T12:00:00Z",
//   product,
//   user,
// };

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  const userId = await session?.user?.id;
  const user = await getUserById(userId);
  const orders = await getOrderById(id, userId);



  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">You must be logged in to view this page.</p>
      </div>
    );
  }

    if(!user || !orders || orders.status !== 200 || !orders.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Order not found or you do not have permission to view this order.</p>
      </div>
    );
  }


  return (
    <div>
      <OrderTrack order={orders.data} />
    </div>
  );
}
