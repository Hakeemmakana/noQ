import React from 'react'

const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
            <button className="w-9 h-9 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-9 h-9 rounded-2xl text-sm font-bold transition-all ${
                  page === 1
                    ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                    : "bg-white border border-gray-200 text-gray-400 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-gray-300 font-bold px-1">···</span>
            <button className="w-9 h-9 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
  )
}

export default Pagination
