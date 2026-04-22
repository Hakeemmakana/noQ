import React ,{useState}from 'react'
import Navbar from '../../components/Navbar';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';

const menuItems = [
  {
    id: 1,
    name: "1 Cubbus",
    price: 5.0,
    description: "Traditional flatbread served warm with a side of hummus dip.",
    category: "Continental",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
  },
  {
    id: 2,
    name: "Grilled Salmon",
    price: 22.0,
    description: "Fresh Atlantic salmon with herbs and seasonal vegetables.",
    category: "Continental",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80",
  },
  {
    id: 3,
    name: "Local Jollof Rice",
    price: 15.0,
    description: "Spicy seasoned rice served with sweet plantain and grilled chicken.",
    category: "Local",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80",
  },
  {
    id: 4,
    name: "Classic Burger",
    price: 12.0,
    description: "Premium beef patty with melted cheese, fresh lettuce, and tomato.",
    category: "Continental",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    id: 5,
    name: "Caesar Salad",
    price: 10.0,
    description: "Crispy romaine lettuce, parmesan, croutons, and Caesar dressing.",
    category: "Continental",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80",
  },
  {
    id: 6,
    name: "Pasta Carbonara",
    price: 18.0,
    description: "Spaghetti with a rich creamy sauce, pancetta, and black pepper.",
    category: "Continental",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80",
  },
  {
    id: 7,
    name: "Fresh Fruit Platter",
    price: 8.0,
    description: "Slices of seasonal melons, berries, and tropical fruits.",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80",
  },
  {
    id: 8,
    name: "Iced Coffee",
    price: 4.5,
    description: "Signature cold brew served over ice with your choice of milk.",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
  },
  {
    id: 9,
    name: "Sparkling Water",
    price: 3.0,
    description: "Refreshing carbonated natural spring water with lemon.",
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80",
  },
];

const categories = ["Continental", "Local", "Drinks", "Desserts", "Appetizers"];
const priceRanges = ["Under $10", "$10 - $25", "Over $25"];

const categoryIcons: Record<string, string> = {
  Continental: "🍽️",
  Local: "📍",
  Drinks: "🍹",
  Desserts: "🍰",
  Appetizers: "🥗",
};
const MenuPage = () => {
  console.log('sss')
   const [activeCategory, setActiveCategory] = useState("Continental");
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const count = (prev[id] || 0) - 1;
      if (count <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: count };
    });
  };

  return (
    
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navigation */}
      <Navbar/>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-56 shrink-0">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sticky top-24">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Menu Categories</p>
            <nav className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all text-left ${
                    activeCategory === cat
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <span className="text-base">{categoryIcons[cat]}</span>
                  {cat}
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Price Range</p>
              <div className="flex flex-col gap-2">
                {priceRanges.map((range) => (
                  <label key={range} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => setSelectedPrice(selectedPrice === range ? null : range)}
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedPrice === range ? "border-blue-500 bg-blue-500" : "border-gray-300 group-hover:border-blue-300"
                      }`}
                    >
                      {selectedPrice === range && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Our Menu</h1>
              <p className="text-gray-400 mt-1 text-sm">Freshly prepared meals delivered straight to your room or seat.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 transition-all hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Order
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {menuItems.length > 0 ? (
                menuItems.map(item=>{
                  return <ProductCard 
                  item={item}
                  setCart={setCart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart} />
                })
            ) : (
              <div className="col-span-3 py-20 text-center text-gray-300">
                <div className="text-5xl mb-3">🍽️</div>
                <p className="font-semibold text-gray-400">No items found</p>
                <p className="text-sm text-gray-300 mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination/>
        </main>
      </div>
    </div>
  )
}

export default MenuPage


// import { useState } from "react";



// export default function NoQMenu() {
//   const [activeCategory, setActiveCategory] = useState("Continental");
//   const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
//   const [cart, setCart] = useState<Record<number, number>>({});
//   const [searchQuery, setSearchQuery] = useState("");

//   const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

//   const addToCart = (id: number) => {
//     setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
//   };

//   const removeFromCart = (id: number) => {
//     setCart((prev) => {
//       const count = (prev[id] || 0) - 1;
//       if (count <= 0) {
//         const next = { ...prev };
//         delete next[id];
//         return next;
//       }
//       return { ...prev, [id]: count };
//     });
//   };

//   const filteredItems = menuItems.filter((item) => {
//     const matchCategory = item.category === activeCategory || activeCategory === "All";
//     const matchSearch =
//       !searchQuery ||
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchPrice =
//       !selectedPrice ||
//       (selectedPrice === "Under $10" && item.price < 10) ||
//       (selectedPrice === "$10 - $25" && item.price >= 10 && item.price <= 25) ||
//       (selectedPrice === "Over $25" && item.price > 25);
//     return matchCategory && matchSearch && matchPrice;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       {/* Top Navigation */}
//       <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
//           {/* Logo */}
//           <div className="flex items-center gap-2 shrink-0">
//             <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-md shadow-blue-200">
//               <span className="text-white font-black text-sm tracking-tight">NoQ</span>
//             </div>
//           </div>

//           {/* Search */}
//           <div className="flex-1 max-w-md relative">
//             <svg
//               className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             <input
//               type="text"
//               placeholder="Search for dishes, cuisines..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-100 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
//             />
//           </div>

//           {/* Cart + Avatar */}
//           <div className="flex items-center gap-3 shrink-0">
//             <button className="relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-semibold text-gray-700">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               Cart
//               {totalCartItems > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
//                   {totalCartItems}
//                 </span>
//               )}
//             </button>
//             <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center border-2 border-rose-200">
//               <svg className="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
//         {/* Sidebar */}
//         <aside className="w-56 shrink-0">
//           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sticky top-24">
//             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Menu Categories</p>
//             <nav className="flex flex-col gap-1">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all text-left ${
//                     activeCategory === cat
//                       ? "bg-blue-50 text-blue-600"
//                       : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
//                   }`}
//                 >
//                   <span className="text-base">{categoryIcons[cat]}</span>
//                   {cat}
//                 </button>
//               ))}
//             </nav>

//             <div className="mt-6 pt-5 border-t border-gray-100">
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Price Range</p>
//               <div className="flex flex-col gap-2">
//                 {priceRanges.map((range) => (
//                   <label key={range} className="flex items-center gap-2.5 cursor-pointer group">
//                     <div
//                       onClick={() => setSelectedPrice(selectedPrice === range ? null : range)}
//                       className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
//                         selectedPrice === range ? "border-blue-500 bg-blue-500" : "border-gray-300 group-hover:border-blue-300"
//                       }`}
//                     >
//                       {selectedPrice === range && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
//                     </div>
//                     <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{range}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 min-w-0">
//           {/* Header */}
//           <div className="flex items-start justify-between mb-8">
//             <div>
//               <h1 className="text-3xl font-black text-gray-900 tracking-tight">Our Menu</h1>
//               <p className="text-gray-400 mt-1 text-sm">Freshly prepared meals delivered straight to your room or seat.</p>
//             </div>
//             <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 transition-all hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//               Quick Order
//             </button>
//           </div>

//           {/* Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {filteredItems.length > 0 ? (
//               filteredItems.map((item) => {
//                 const qty = cart[item.id] || 0;
//                 return (
//                   <div
//                     key={item.id}
//                     className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 group"
//                   >
//                     {/* Image */}
//                     <div className="relative overflow-hidden h-48">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 text-xs font-bold text-gray-600 shadow-sm">
//                         {item.category}
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-5">
//                       <div className="flex items-start justify-between mb-2">
//                         <h3 className="font-bold text-gray-900 text-base leading-snug">{item.name}</h3>
//                         <span className="text-blue-500 font-black text-base shrink-0 ml-2">${item.price.toFixed(2)}</span>
//                       </div>
//                       <p className="text-gray-400 text-xs leading-relaxed mb-4">{item.description}</p>

//                       {/* Add to Cart / Quantity */}
//                       {qty === 0 ? (
//                         <button
//                           onClick={() => addToCart(item.id)}
//                           className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold transition-all shadow-md shadow-blue-100 hover:shadow-blue-200 active:scale-95"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                           </svg>
//                           Add to Cart
//                         </button>
//                       ) : (
//                         <div className="flex items-center justify-center gap-4">
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-gray-600 font-bold text-lg transition-colors"
//                           >
//                             −
//                           </button>
//                           <div className="w-10 h-9 rounded-2xl bg-blue-500 flex items-center justify-center">
//                             <span className="text-white font-black text-sm">{qty}</span>
//                           </div>
//                           <button
//                             onClick={() => addToCart(item.id)}
//                             className="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white font-bold text-lg transition-colors shadow-md shadow-blue-200"
//                           >
//                             +
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="col-span-3 py-20 text-center text-gray-300">
//                 <div className="text-5xl mb-3">🍽️</div>
//                 <p className="font-semibold text-gray-400">No items found</p>
//                 <p className="text-sm text-gray-300 mt-1">Try adjusting your filters</p>
//               </div>
//             )}
//           </div>

//           {/* Pagination */}
//           <div className="flex items-center justify-center gap-2 mt-10">
//             <button className="w-9 h-9 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             {[1, 2, 3].map((page) => (
//               <button
//                 key={page}
//                 className={`w-9 h-9 rounded-2xl text-sm font-bold transition-all ${
//                   page === 1
//                     ? "bg-blue-500 text-white shadow-md shadow-blue-200"
//                     : "bg-white border border-gray-200 text-gray-400 hover:bg-gray-50"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//             <span className="text-gray-300 font-bold px-1">···</span>
//             <button className="w-9 h-9 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
