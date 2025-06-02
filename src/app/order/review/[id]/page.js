import React from "react";
import RatingReviewPage from "@/app/components/Review";
import { getServerSession } from "next-auth";
import { getOrderById } from "@/app/lib/action";
import { authOptions } from "@/app/lib/auth";
import OrderErrorState from "@/app/components/OrderErrorState";

async function page({ params }) {
  const { id } = params;
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return <OrderErrorState type="no-user" />;
    }

    const userId = session.user.id;
    const order = await getOrderById(id, userId);

  if (!order || order.status === false || !order.data) {
    return <OrderErrorState type="no-orders" />;
  }

  if (order.data.rating !== null) {
    return <OrderErrorState type="already-reviewed" />;
  }


    return <RatingReviewPage product={order.data.product} userId={userId} />;
  } catch (error) {
    console.error("Error loading review page:", error);
    return <OrderErrorState type="server-error" />;
  }
}

export default page;
