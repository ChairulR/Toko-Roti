"use client"

export default function ProfileSkeleton() {
  return (
    <div className="container min-h-screen flex flex-col pb-20">
      {/* Header */}
      <div className="py-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="p-2">
            <div className="w-6 h-6 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          <div className="h-7 w-32 bg-gray-200 rounded-md animate-pulse mx-auto"></div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center py-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse mb-3"></div>
        <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* User Information */}
      <div className="p-4">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse mb-3"></div>

          <div className="space-y-5">
            <div>
              <div className="h-3 w-20 bg-gray-200 rounded-md animate-pulse mb-2"></div>
              <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            <div>
              <div className="h-3 w-20 bg-gray-200 rounded-md animate-pulse mb-2"></div>
              <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            <div>
              <div className="h-3 w-20 bg-gray-200 rounded-md animate-pulse mb-2"></div>
              <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Logout Button Placeholder */}
        <div className="w-full h-12 mt-8 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}
