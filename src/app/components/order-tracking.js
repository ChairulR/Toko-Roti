"use client";
import { OrderStatus } from "@prisma/client";

import {
  getTrackingSteps,
  getStatusColor,
  getButtonText,
  formatterCurrency,
} from "@/app/lib/utils";

export default function OrderTrack({ order }) {
  const trackingSteps = getTrackingSteps(order.status);
  const isButtonDisabled = order.status !== OrderStatus.COMPLETED;

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <h1 className="text-lg font-medium text-gray-900">Take Order</h1>
        </div>
      </div>

      {/* Order Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              {order.user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-medium text-gray-900">{order.user.name}</h2>
              <p
                className={`text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                Status: {order.status}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {formatterCurrency.format(order.product.price)}
            </p>
            <p className="text-xs text-gray-500">{order.product.name}</p>
          </div>
        </div>
      </div>

      {/* Receipt Order */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between cursor-pointer">
          <span className="text-gray-700 font-medium">Receipt Order</span>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Tracking Status */}
      <div className="p-4 space-y-6 relative">
        {trackingSteps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4 relative">
            <div className="flex-shrink-0 mt-1 relative z-10">
              {step.completed ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : step.current ? (
                <div
                  className={`w-6 h-6 rounded-full ${
                    step.cancelled ? "bg-red-500" : "bg-orange-500"
                  }`}
                >
                  {step.cancelled && (
                    <svg
                      className="w-4 h-4 text-white m-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </div>
              ) : (
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              )}
            </div>
            <div className="flex-1">
              <p
                className={`font-medium ${
                  step.current
                    ? step.cancelled
                      ? "text-red-600"
                      : "text-gray-900"
                    : step.completed
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {step.title}
              </p>
              {step.subtitle && (
                <p className="text-sm text-gray-500 mt-1">{step.subtitle}</p>
              )}
            </div>
            {index < trackingSteps.length - 1 && (
              <div className="absolute left-3 top-8 w-0.5 h-8 bg-gray-200 z-0"></div>
            )}
          </div>
        ))}

        {order.status !== OrderStatus.CANCELLED && (
          <div className="mt-6 pt-4">
            <p className="text-sm text-gray-500">
              {order.status === OrderStatus.COMPLETED
                ? "Ready for pickup - Available until 6:00 PM"
                : "Schedule Pick Up 09:00 AM"}
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="p-4 mt-auto">
        <button
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            isButtonDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : order.status === OrderStatus.COMPLETED
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
          disabled={isButtonDisabled}
        >
          {getButtonText(order.status)}
        </button>
      </div>
    </div>
  );
}
