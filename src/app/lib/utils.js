
import { OrderStatus } from "@prisma/client"

export const queryString = (params, key, value) => {
  const newParams = new URLSearchParams(params);
  newParams.set(key, value);
  return `?${newParams.toString()}`;
};

export function formatDateToDMY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export const formatterCurrency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
})



export const getTrackingSteps = (currentStatus) => {
  const steps = [
    {
      id: 1,
      status: OrderStatus.PURCESHED,
      title: "Order Purchased",
      subtitle: "Your order has been placed successfully",
    },
    {
      id: 2,
      status: OrderStatus.PROCESS,
      title: "Order Processing",
      subtitle: "We're preparing your order",
    },
    {
      id: 3,
      status: OrderStatus.COMPLETED,
      title: "Order Completed",
      subtitle: "Your order is ready for pickup",
    },
  ]

  if (currentStatus === OrderStatus.CANCELLED) {
    return [
      {
        id: 1,
        status: OrderStatus.PURCESHED,
        title: "Order Purchased",
        subtitle: "Your order was placed",
        completed: true,
      },
      {
        id: 2,
        status: OrderStatus.CANCELLED,
        title: "Order Cancelled",
        subtitle: "Your order has been cancelled",
        current: true,
        cancelled: true,
      },
    ]
  }

  if (currentStatus === OrderStatus.COMPLETED) {
    return steps.map((step) => ({
      ...step,
      completed: true,
      current: false,
    }))
  }

  const statusOrder = [OrderStatus.PURCESHED, OrderStatus.PROCESS, OrderStatus.COMPLETED]
  const currentIndex = statusOrder.indexOf(currentStatus)

  return steps.map((step, index) => ({
    ...step,
    completed: index < currentIndex,
    current: index === currentIndex,
  }))
}

export const getStatusColor = (status) => {
  switch (status) {
    case OrderStatus.COMPLETED:
      return "text-green-600"
    case OrderStatus.CANCELLED:
      return "text-red-600"
    case OrderStatus.PROCESS:
      return "text-orange-600"
    default:
      return "text-gray-600"
  }
}

export const getButtonText = (status) => {
  switch (status) {
    case OrderStatus.COMPLETED:
      return "Pick Up Order"
    case OrderStatus.CANCELLED:
      return "Order Cancelled"
    case OrderStatus.PROCESS:
      return "Track Order"
    default:
      return "View Order"
  }
}
