import React from 'react'

const ProductCard = ({item,setCart,addToCart,removeFromCart}) => {
  return (
    <div
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 text-xs font-bold text-gray-600 shadow-sm">
                        {item.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 text-base leading-snug">{item.name}</h3>
                        <span className="text-blue-500 font-black text-base shrink-0 ml-2">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed mb-4">{item.description}</p>

                      {/* Add to Cart / Quantity */}
                      {/* {qty === 0 ? (    */}
                        <button
                        //   onClick={() => addToCart(item.id)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold transition-all shadow-md shadow-blue-100 hover:shadow-blue-200 active:scale-95"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Add to Cart
                        </button>
                      {/* ) : ( */}
                        {/* <div className="flex items-center justify-center gap-4">
                          <button
                            // onClick={() => removeFromCart(item.id)}
                            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-gray-600 font-bold text-lg transition-colors"
                          >
                            −
                          </button>
                          <div className="w-10 h-9 rounded-2xl bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-black text-sm">{qty}</span>
                          </div>
                          <button
                            // onClick={() => addToCart(item.id)}
                            className="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white font-bold text-lg transition-colors shadow-md shadow-blue-200"
                          >
                            +
                          </button>
                        </div> */}
                      {/* )} */}
                    </div>
                  </div>
  )
}

export default ProductCard
