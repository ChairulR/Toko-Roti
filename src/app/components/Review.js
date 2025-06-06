"use client";

import { formatterCurrency } from "@/app/lib/utils";
import { useState } from "react";
import { createComment } from "../lib/action";
import { useRouter } from "next/navigation";

export default function RatingReviewPage({ product,orderId ,userId }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex) => {
    setHoveredRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createComment(
        parseInt(product.id, 10),
        parseInt(userId, 10),
        parseInt(rating, 10),
        parseInt(orderId, 10),
        review
      );

      if (!response || response.status === false) {
        throw new Error(response.message || "Failed to submit review");
      }

      setReview("");
      alert("Review submitted successfully!");
      router.push("/order/history"); 
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Rating and Review
      </h2>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="flex justify-center bg-gray-50 p-4">
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="w-full h-64 object-contain"
          />
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {product.name}
              </h3>
              {product.category && (
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">
                {typeof product.price === "number"
                  ? `Rp ${formatterCurrency.format(product.price)}`
                  : product.price}
              </p>
            </div>
          </div>

          {product.attributes && (
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(product.attributes).map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {key}: {value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          How's your order this time?
        </h3>
      </div>

      <div className="mb-6">
        <h4 className="text-base font-medium text-gray-900 mb-4">Rating</h4>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              className="p-1 transition-transform hover:scale-110"
            >
              <svg
                className={`w-10 h-10 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-center text-sm text-gray-600 mt-2">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h4 className="text-base font-medium text-gray-900 mb-4">Review</h4>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Tell us about your order experience"
          className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            Reviews will be visible to the public
          </p>
          <p className="text-xs text-gray-400">{review.length}/500</p>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitting}
        className={`w-full py-3 px-4 rounded-lg mb-8 font-medium transition-all duration-200 ${
          rating === 0 || isSubmitting
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-900 text-white transform hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </div>
        ) : (
          "Send a review"
        )}
      </button>
    </div>
  );
}
