import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    let  user=false
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-md shadow-blue-200">
                        <span className="text-white font-black text-sm tracking-tight">NoQ</span>
                    </div>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-md relative">
                    <svg
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for dishes, cuisines..."
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-100 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
                    />
                </div>

        
                {/* Cart + Avatar */}
                {user?(
                <div className="flex items-center gap-3 shrink-0">
                    <button className="relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-semibold text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Cart
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
                        2</span>
                    </button>
                    <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center border-2 border-rose-200">
                        <svg className="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                    </div>
                </div>
                ):(
                <div className="flex items-center gap-3 shrink-0">
            <Link to={'/register-restaurant'} className="px-4 py-2.5 rounded-full border-2 border-blue-500 text-blue-500 text-sm font-bold hover:bg-blue-50 transition-colors">
              Register Your Restaurant
            </Link>
            <Link to={'/login'} className="px-5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5">
              Login
            </Link>
          </div>
                )}
            </div>
            
        </header>
    )
}

export default Navbar
