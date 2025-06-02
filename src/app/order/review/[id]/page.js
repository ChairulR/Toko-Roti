import React from "react";
import RatingReviewPage from "@/app/components/Review";
import { getServerSession } from "next-auth";
import { getOrderById } from "@/app/lib/action";
import { authOptions } from "@/app/lib/auth";
import OrderErrorState from "@/app/components/OrderErrorState";

async function page({ params }) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return <OrderErrorState type="no-user" />;
    }

    const userId = session.user.id;
    const order = await getOrderById(parseInt(id, 10), parseInt(userId, 10));

    if (!order || !order.data) {
      return <OrderErrorState type="no-orders" />;
    }

    if (order.data?.comments?.length > 0) {
      return <OrderErrorState type="hash-review" />;
    }

    return (
      <RatingReviewPage
        product={order.data.product}
        orderId={id}
        userId={userId}
      />
    );
  } catch (error) {
    console.error("Error loading review page:", error);
    return <OrderErrorState type="server-error" />;
  }
}

export default page;
