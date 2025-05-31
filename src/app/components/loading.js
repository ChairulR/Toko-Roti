import React from "react";

function Loading({
    message = "Loading...",
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-orange-200 rounded-full animate-spin"></div>
          <div className="w-12 h-12 border-4 border-orange-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
        </div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}
export default Loading;
