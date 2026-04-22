// import React from 'react'

// const HomePage = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default HomePage



import { useState } from "react";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";

const hotels = [
  {
    id: 1,
    name: "La Terraza",
    location: "Downtown Miami, FL",
    tables: ["4T AVAILABLE", "6T AVAILABLE"],
    rating: 4.8,
    reviews: 124,
    cuisine: "Mediterranean",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    tag: "Rooftop",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 2,
    name: "Ocean Palms",
    location: "North Beach, Miami",
    tables: ["2T AVAILABLE"],
    rating: 4.6,
    reviews: 98,
    cuisine: "Seafood",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    tag: "Beachfront",
    tagColor: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 3,
    name: "The Azure",
    location: "South Beach, FL",
    tables: ["8T AVAILABLE", "4T AVAILABLE"],
    rating: 4.9,
    reviews: 210,
    cuisine: "Cocktail Bar",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=80",
    tag: "Trending",
    tagColor: "bg-rose-100 text-rose-600",
  },
  {
    id: 4,
    name: "The Grand Atrium",
    location: "Brickell, Miami",
    tables: ["10T AVAILABLE"],
    rating: 4.5,
    reviews: 76,
    cuisine: "Fine Dining",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&q=80",
    tag: "Luxury",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    id: 5,
    name: "Skyline Suites",
    location: "Design District, Miami",
    tables: ["4T AVAILABLE"],
    rating: 4.7,
    reviews: 143,
    cuisine: "Modern American",
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&q=80",
    tag: "Skyview",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 6,
    name: "Marquee House",
    location: "Coral Gables, FL",
    tables: ["6T AVAILABLE"],
    rating: 4.4,
    reviews: 89,
    cuisine: "Latin Fusion",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80",
    tag: "Popular",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    id: 7,
    name: "Velvet Room",
    location: "Wynwood, Miami",
    tables: ["3T AVAILABLE", "5T AVAILABLE"],
    rating: 4.6,
    reviews: 167,
    cuisine: "Contemporary",
    image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=600&q=80",
    tag: "Artistic",
    tagColor: "bg-pink-100 text-pink-700",
  },
  {
    id: 8,
    name: "Harbor Lights",
    location: "Coconut Grove, Miami",
    tables: ["7T AVAILABLE"],
    rating: 4.8,
    reviews: 192,
    cuisine: "Waterfront",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80",
    tag: "Waterfront",
    tagColor: "bg-teal-100 text-teal-700",
  },
  {
    id: 9,
    name: "Ember & Oak",
    location: "Little Havana, Miami",
    tables: ["2T AVAILABLE", "4T AVAILABLE"],
    rating: 4.7,
    reviews: 115,
    cuisine: "Steakhouse",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80",
    tag: "Chef's Pick",
    tagColor: "bg-orange-100 text-orange-700",
  },
  // Page 2
  {
    id: 10,
    name: "Nomi Sky Bar",
    location: "Edgewater, Miami",
    tables: ["5T AVAILABLE"],
    rating: 4.5,
    reviews: 88,
    cuisine: "Asian Fusion",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    tag: "Rooftop",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 11,
    name: "Côte d'Azur",
    location: "Bal Harbour, FL",
    tables: ["3T AVAILABLE", "6T AVAILABLE"],
    rating: 4.9,
    reviews: 234,
    cuisine: "French",
    image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80",
    tag: "Luxury",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    id: 12,
    name: "The Copper Pot",
    location: "Little River, Miami",
    tables: ["4T AVAILABLE"],
    rating: 4.3,
    reviews: 62,
    cuisine: "Farm to Table",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    tag: "Organic",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    id: 13,
    name: "Blue Marlin",
    location: "Key Biscayne, FL",
    tables: ["8T AVAILABLE", "2T AVAILABLE"],
    rating: 4.6,
    reviews: 178,
    cuisine: "Seafood",
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&q=80",
    tag: "Beachfront",
    tagColor: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 14,
    name: "Alchemy Lounge",
    location: "Midtown Miami",
    tables: ["6T AVAILABLE"],
    rating: 4.7,
    reviews: 141,
    cuisine: "Cocktails & Bites",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80",
    tag: "Trending",
    tagColor: "bg-rose-100 text-rose-600",
  },
  {
    id: 15,
    name: "Palmetto House",
    location: "Hialeah, Miami",
    tables: ["5T AVAILABLE", "3T AVAILABLE"],
    rating: 4.4,
    reviews: 93,
    cuisine: "Cuban",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    tag: "Local Fave",
    tagColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 16,
    name: "Soleil Terrace",
    location: "Aventura, FL",
    tables: ["9T AVAILABLE"],
    rating: 4.8,
    reviews: 207,
    cuisine: "Mediterranean",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    tag: "Skyview",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 17,
    name: "Ink & Spice",
    location: "Overtown, Miami",
    tables: ["4T AVAILABLE"],
    rating: 4.5,
    reviews: 71,
    cuisine: "Indian",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=80",
    tag: "Spicy",
    tagColor: "bg-red-100 text-red-600",
  },
  {
    id: 18,
    name: "Canvas Rooftop",
    location: "Arts District, Miami",
    tables: ["3T AVAILABLE", "7T AVAILABLE"],
    rating: 4.9,
    reviews: 289,
    cuisine: "International",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&q=80",
    tag: "Artistic",
    tagColor: "bg-pink-100 text-pink-700",
  },
];

const ITEMS_PER_PAGE = 9;
const sortOptions = ["Recommended", "Rating: High to Low", "Most Reviewed", "Name A-Z"];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className={`w-3.5 h-3.5 ${filled ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState("Recommended");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = hotels.filter(
    (h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Rating: High to Low") return b.rating - a.rating;
    if (sortBy === "Most Reviewed") return b.reviews - a.reviews;
    if (sortBy === "Name A-Z") return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
     
      <Navbar/>


      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Discover Hotels</h2>
            <p className="text-gray-400 text-sm mt-0.5">
              {sorted.length} venues available · Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filter
            </button>
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                Sort by: {sortBy}
                <svg className={`w-4 h-4 transition-transform ${showSortMenu ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setShowSortMenu(false); setCurrentPage(1); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt ? "text-blue-500 font-bold bg-blue-50" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((hotel, idx) => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/70 hover:-translate-y-1.5 transition-all duration-300 group"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Tag */}
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${hotel.tagColor} backdrop-blur-sm`}>
                  {hotel.tag}
                </div>

                {/* Favorite */}
                <button
                  onClick={() => toggleFavorite(hotel.id)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                    favorites.has(hotel.id)
                      ? "bg-rose-500 text-white scale-110"
                      : "bg-white/90 backdrop-blur-sm text-gray-400 hover:text-rose-400 hover:scale-110"
                  }`}
                >
                  <svg className="w-4.5 h-4.5 w-4 h-4" fill={favorites.has(hotel.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Rating on image */}
                {/* <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} filled={s <= Math.round(hotel.rating)} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-700">{hotel.rating}</span>
                  <span className="text-xs text-gray-400">({hotel.reviews})</span>
                </div> */}
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-black text-gray-900 text-lg leading-tight">{hotel.name}</h3>
                  <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full mt-0.5 shrink-0 ml-2">{hotel.cuisine}</span>
                </div>

                <div className="flex items-center gap-1 text-gray-400 text-xs mb-4">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {hotel.location}
                </div>

                

                <button className="w-full py-2.5 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold transition-all shadow-md shadow-blue-100 hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none">
                  View Hotel
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {paginated.length === 0 && (
          <div className="py-24 text-center">
            <div className="text-5xl mb-4">🏨</div>
            <p className="text-xl font-bold text-gray-300">No hotels found</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
          </div>
        )}

        {/* Pagination */}
        <Pagination/>
        
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-400">© 2024 NoQ. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Terms of Service</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg>
            </button>
            <button className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
