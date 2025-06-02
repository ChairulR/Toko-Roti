"use client";

export default function OrderErrorState({ type = "not-found" }) {
  const getErrorContent = () => {
    switch (type) {
      case "no-user":
        return {
          icon: (
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ),
          title: "Authentication Required",
          description: "Please log in to view your orders",
          action: "Sign In",
          actionColor: "bg-blue-500 hover:bg-blue-600",
        };
      case "no-orders":
        return {
          icon: (
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          ),
          title: "No Orders Found",
          description: "You haven't placed any orders yet",
          action: "Start Shopping",
          actionColor: "bg-green-500 hover:bg-green-600",
        };
      case "permission-denied":
        return {
          icon: (
            <svg
              className="w-16 h-16 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          ),
          title: "Access Denied",
          description: "You don't have permission to view this order",
          action: "Go Back",
          actionColor: "bg-gray-500 hover:bg-gray-600",
        };
      case "server-error":
        return {
          icon: (
            <svg
              className="w-16 h-16 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          ),
          title: "Something Went Wrong",
          description: "Unable to load order data. Please try again later",
          action: "Retry",
          actionColor: "bg-orange-500 hover:bg-orange-600",
        };
      case "hash-review":
        return {
          icon: (
            <svg
              className="w-16 h-16 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
          title: "Order Already Reviewed",
          description: "This order has already been reviewed previously.",
          action: "View Review",
          actionColor: "bg-blue-500 hover:bg-blue-600",
        };
  
      default:
        return {
          icon: (
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.935-6.072-2.456M3 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z"
              />
            </svg>
          ),
          title: "Order Not Found",
          description:
            "The order you're looking for doesn't exist or has been removed",
          action: "View All Orders",
          actionColor: "bg-blue-500 hover:bg-blue-600",
        };
    }
  };

  const content = getErrorContent();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gray-50 rounded-full">{content.icon}</div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {content.title}
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            {content.description}
          </p>

          {/* Action Button */}
          <button
            className={`w-full ${content.actionColor} text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95`}
            onClick={() => {
              // Handle different actions based on type
              switch (type) {
                case "no-user":
                  // Redirect to sign in
                  window.location.href = "/login";
                  break;
                case "no-orders":
                  // Redirect to shop
                  window.location.href = "/";
                  break;
                case "permission-denied":
                  // Go back
                  window.history.back();
                  break;
                case "server-error":
                  // Reload page
                  window.location.reload();
                  break;
                default:
                  // Go to orders page
                  window.location.href = "/order/history";
              }
            }}
          >
            {content.action}
          </button>

          {/* Secondary Action */}
          <button
            className="w-full mt-3 text-gray-500 hover:text-gray-700 py-2 px-6 font-medium transition-colors"
            onClick={() => (window.location.href = "/")}
          >
            Go to Home
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Need help?</p>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
