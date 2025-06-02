"use client"

import { useState } from "react"

export default function ProductReviews({ comments, itemsPerPage = 3 }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(comments.length / itemsPerPage)
  const indexOfLastComment = currentPage * itemsPerPage
  const indexOfFirstComment = indexOfLastComment - itemsPerPage
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1)
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1)

  if (comments.length === 0) {
    return <p className="text-gray-500 text-sm mt-2">Belum ada ulasan</p>
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 border-b pb-2">📝 Review Pengguna</h3>

      <div className="space-y-4">
        {currentComments.map((comment) => (
          <div key={comment.id} className="flex gap-3 items-start bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-sm">
              {comment.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{comment.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p className="text-yellow-500 text-sm">
                {"★".repeat(comment.rate)}{" "}
                <span className="text-gray-500">({comment.rate})</span>
              </p>
              <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded text-sm font-medium ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            ⬅ Sebelumnya
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-8 h-8 rounded-full text-sm font-semibold ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded text-sm font-medium ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Selanjutnya ➡
          </button>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center mt-3">
        Menampilkan {indexOfFirstComment + 1}-{Math.min(indexOfLastComment, comments.length)} dari{" "}
        {comments.length} ulasan
      </p>
    </div>
  )
}
