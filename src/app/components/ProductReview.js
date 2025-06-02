"use client"

import { useState } from "react"


export default function ProductReviews({ comments, itemsPerPage = 3 }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(comments.length / itemsPerPage)
  const indexOfLastComment = currentPage * itemsPerPage
  const indexOfFirstComment = indexOfLastComment - itemsPerPage
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (comments.length === 0) {
    return <p className="text-gray-500 text-sm mt-2">Belum ada ulasan</p>
  }

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Review Pengguna</h3>

      {currentComments.map((comment) => (
        <div key={comment.id} className="mb-3 border-b pb-2">
          <p className="font-medium">{comment.userName}</p>
          <p className="text-yellow-500 text-sm">
            {"★".repeat(comment.rate)} <span className="text-gray-500">({comment.rate})</span>
          </p>
          <p className="text-sm text-gray-700">{comment.comment}</p>
        </div>
      ))}
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded text-sm ${currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Sebelumnya
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-8 h-8 rounded-full text-sm ${
                  currentPage === i + 1 ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded text-sm ${currentPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Selanjutnya
          </button>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center mt-2">
        Menampilkan {indexOfFirstComment + 1}-{Math.min(indexOfLastComment, comments.length)} dari {comments.length}{" "}
        ulasan
      </p>
    </div>
  )
}
