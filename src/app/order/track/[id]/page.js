import React from "react";
import OrderTrack from "../../../components/order-tracking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { getOrderById, getUserById } from "@/app/lib/action";
import OrderErrorState from "@/app/components/NotLogin";

export default async function Page({ params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return <OrderErrorState type="no-user" />;
    }

    const { id } = params;
    const userId = session.user?.id;
    const user = await getUserById(userId);
    const orders = await getOrderById(id, userId);

    if (!user || !orders || orders.status === false || !orders.data) {
      return <OrderErrorState type="no-orders" />;
    }

    return (
      <div>
        <OrderTrack order={orders.data} />
      </div>
    );
  } catch (error) {
    console.error("Error loading order page:", error);
    return <OrderErrorState type="server-error" />;
  }
}
