// // NoQ — Hotel Waiter Management System
// // Stack: React + TypeScript + Tailwind CSS
// //
// // Requirements:
// //   1. Add to your tailwind.config.ts:
// //      fontFamily: { cormorant: ['"Cormorant Garamond"', 'serif'], outfit: ['Outfit', 'sans-serif'] }
// //
// //   2. Add to your <head> or global CSS:
// //      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />
// //
// //   3. In your global CSS (index.css / globals.css) add:
// //      .no-spinner::-webkit-outer-spin-button,
// //      .no-spinner::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
// //      .no-spinner { -moz-appearance: textfield; }

// import { useState } from "react";

// const QUICK_TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// export default function NoQApp() {
//   const [dark, setDark] = useState(false);
//   const [tableValue, setTableValue] = useState<string>("");
//   const [submitted, setSubmitted] = useState(false);
//   const [scanning, setScanning] = useState(false);

//   const tableNum = parseInt(tableValue);
//   const isValid = !isNaN(tableNum) && tableNum >= 1;

//   // ── theme tokens ──────────────────────────────────────────────
//   const t = {
//     bg:             dark ? "bg-[#100F0C]"   : "bg-[#F7F4EE]",
//     surface:        dark ? "bg-[#1C1A15]"   : "bg-white",
//     surface2:       dark ? "bg-[#242119]"   : "bg-[#F0EBE1]",
//     border:         dark ? "border-[rgba(180,155,90,0.14)]" : "border-[rgba(180,155,90,0.18)]",
//     text:           dark ? "text-[#EDE7DC]" : "text-[#1A1612]",
//     textMuted:      dark ? "text-[#9A8E80]" : "text-[#7A6E62]",
//     textHint:       dark ? "text-[#504840]" : "text-[#B0A898]",
//     inputBg:        dark ? "bg-[#242119]"   : "bg-[#F0EBE1]",
//     qbBase:         dark
//       ? "bg-[#242119] border-[rgba(180,155,90,0.14)] text-[#9A8E80]"
//       : "bg-[#F0EBE1] border-[rgba(180,155,90,0.18)] text-[#7A6E62]",
//     toggleBg:       dark ? "bg-[#242119]"   : "bg-[#F0EBE1]",
//   };

//   const gold = "#C9A84C";

//   function handleInput(v: string) {
//     if (v === "" || (/^\d{1,2}$/.test(v) && parseInt(v) <= 99)) {
//       setTableValue(v);
//     }
//   }

//   function pick(n: number) {
//     setTableValue(String(n));
//   }

//   function simulateScan() {
//     if (scanning) return;
//     setScanning(true);
//     const t = Math.floor(Math.random() * 15) + 1;
//     setTimeout(() => {
//       pick(t);
//       setScanning(false);
//     }, 900);
//   }

//   function handleContinue() {
//     if (!isValid) return;
//     setSubmitted(true);
//   }

//   function reset() {
//     setTableValue("");
//     setSubmitted(false);
//   }

//   // ── Success screen ─────────────────────────────────────────────
//   if (submitted) {
//     return (
//       <div className={`min-h-screen ${t.bg} transition-colors duration-300 font-outfit`}>
//         <div className="max-w-[400px] mx-auto px-5 py-10 flex flex-col items-center">
//           {/* Logo */}
//           <div className="w-full flex items-start justify-between mb-8">
//             <div>
//               <div className={`font-cormorant text-[32px] font-semibold leading-none ${t.text}`}>
//                 No<span style={{ color: gold }}>Q</span>
//               </div>
//               <div className={`text-[10.5px] tracking-[2.5px] uppercase mt-1 font-light ${t.textHint}`}>
//                 Hotel Table Service
//               </div>
//             </div>
//           </div>

//           {/* Success card */}
//           <div className={`w-full ${t.surface} border ${t.border} rounded-[20px] flex flex-col items-center px-7 py-11 text-center animate-fadeIn`}>
//             {/* Check circle */}
//             <div
//               className="w-[76px] h-[76px] rounded-full flex items-center justify-center mb-6"
//               style={{ border: `1.5px solid ${gold}`, background: "rgba(201,168,76,0.08)" }}
//             >
//               <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
//                 stroke={gold} strokeWidth="2.5" strokeLinecap="round">
//                 <polyline points="20 6 9 17 4 12" />
//               </svg>
//             </div>

//             <div className={`font-cormorant text-[26px] font-medium ${t.text}`}>
//               Waiter Notified
//             </div>
//             <div className={`text-[13px] font-light mt-2 leading-relaxed ${t.textMuted}`}>
//               Your request has been sent for
//             </div>
//             <div className="font-cormorant text-[52px] font-semibold leading-none my-5"
//               style={{ color: gold }}>
//               Table {tableNum}
//             </div>
//             <div className={`text-[13px] font-light leading-relaxed ${t.textMuted}`}>
//               A staff member is on their way.
//             </div>

//             <button
//               onClick={reset}
//               className={`mt-7 px-7 py-2.5 rounded-full border text-[13px] font-light transition-colors ${t.border} ${t.textMuted} hover:text-[#C9A84C]`}
//               style={{ background: "transparent" }}
//             >
//               Start over
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Main screen ────────────────────────────────────────────────
//   return (
//     <div className={`min-h-screen ${t.bg} transition-colors duration-300 font-outfit`}>
//       <div className="max-w-[400px] mx-auto pb-12">

//         {/* Header */}
//         <div className="flex items-start justify-between px-6 pt-7 mb-7">
//           <div>
//             <div className={`font-cormorant text-[32px] font-semibold leading-none ${t.text}`}>
//               No<span style={{ color: gold }}>Q</span>
//             </div>
//             <div className={`text-[10.5px] tracking-[2.5px] uppercase mt-1 font-light ${t.textHint}`}>
//               Hotel Table Service
//             </div>
//           </div>

//           {/* Day / Night toggle */}
//           <button
//             onClick={() => setDark(!dark)}
//             className={`flex items-center gap-2 ${t.toggleBg} border ${t.border} rounded-full px-3 py-1.5 transition-all`}
//           >
//             <span className={`text-[11px] tracking-wide font-light ${t.textMuted}`}>
//               {dark ? "Night" : "Day"}
//             </span>
//             <div
//               className="w-6 h-6 rounded-full flex items-center justify-center text-[12px]"
//               style={{ background: gold }}
//             >
//               {dark ? "🌙" : "☀️"}
//             </div>
//           </button>
//         </div>

//         {/* QR Card */}
//         <div className={`mx-5 ${t.surface} border ${t.border} rounded-[20px] overflow-hidden`}>
//           {/* Card header */}
//           <div className={`flex items-center gap-3 px-5 py-4 border-b ${t.border}`}>
//             <div
//               className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center flex-shrink-0"
//               style={{ background: gold }}
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//                 stroke="#1A1308" strokeWidth="2" strokeLinecap="round">
//                 <rect x="3" y="3" width="7" height="7" rx="1" />
//                 <rect x="14" y="3" width="7" height="7" rx="1" />
//                 <rect x="3" y="14" width="7" height="7" rx="1" />
//                 <rect x="16" y="16" width="5" height="5" rx="0.5" />
//               </svg>
//             </div>
//             <div>
//               <div className={`font-cormorant text-[17px] font-medium ${t.text}`}>Scan QR Code</div>
//               <div className={`text-[12px] font-light mt-0.5 ${t.textMuted}`}>
//                 Point your camera at the table QR
//               </div>
//             </div>
//           </div>

//           {/* QR viewport */}
//           <div className="flex flex-col items-center gap-3.5 px-5 py-6">
//             <button
//               onClick={simulateScan}
//               className="relative w-[188px] h-[188px] rounded-[14px] flex items-center justify-center overflow-hidden transition-all"
//               style={{
//                 border: `1.5px solid ${scanning ? "rgba(201,168,76,0.9)" : gold}`,
//                 background: dark ? "#242119" : "#F0EBE1",
//               }}
//             >
//               {/* Corner marks */}
//               {(["tl","tr","bl","br"] as const).map((pos) => (
//                 <span
//                   key={pos}
//                   className="absolute w-[18px] h-[18px]"
//                   style={{
//                     top:    pos.startsWith("t") ? -1.5 : "auto",
//                     bottom: pos.startsWith("b") ? -1.5 : "auto",
//                     left:   pos.endsWith("l")   ? -1.5 : "auto",
//                     right:  pos.endsWith("r")   ? -1.5 : "auto",
//                     borderTop:    pos.startsWith("t") ? `3px solid ${gold}` : undefined,
//                     borderBottom: pos.startsWith("b") ? `3px solid ${gold}` : undefined,
//                     borderLeft:   pos.endsWith("l")   ? `3px solid ${gold}` : undefined,
//                     borderRight:  pos.endsWith("r")   ? `3px solid ${gold}` : undefined,
//                     borderRadius:
//                       pos === "tl" ? "5px 0 0 0" :
//                       pos === "tr" ? "0 5px 0 0" :
//                       pos === "bl" ? "0 0 0 5px" : "0 0 5px 0",
//                   }}
//                 />
//               ))}

//               {/* Laser line */}
//               <span
//                 className="absolute left-2.5 right-2.5 h-[1.5px] rounded-sm"
//                 style={{
//                   background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
//                   animation: "laser 2.2s ease-in-out infinite",
//                 }}
//               />

//               {/* QR art */}
//               <svg width="100" height="100" viewBox="0 0 100 100"
//                 fill="currentColor" className={`opacity-20 ${t.text}`}>
//                 <rect x="5"  y="5"  width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="3"/>
//                 <rect x="13" y="13" width="14" height="14" rx="1"/>
//                 <rect x="65" y="5"  width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="3"/>
//                 <rect x="73" y="13" width="14" height="14" rx="1"/>
//                 <rect x="5"  y="65" width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="3"/>
//                 <rect x="13" y="73" width="14" height="14" rx="1"/>
//                 <rect x="65" y="65" width="8" height="8" rx="1"/>
//                 <rect x="77" y="65" width="8" height="8" rx="1"/>
//                 <rect x="65" y="77" width="8" height="8" rx="1"/>
//                 <rect x="77" y="77" width="8" height="8" rx="1"/>
//               </svg>
//             </button>

//             {/* Status dot */}
//             <div className={`flex items-center gap-2 text-[12px] font-light ${t.textHint}`}>
//               <span
//                 className="w-[7px] h-[7px] rounded-full"
//                 style={{
//                   background: gold,
//                   animation: "dpulse 2s ease-in-out infinite",
//                 }}
//               />
//               {scanning ? "Detecting table…" : "Scanner ready — tap to open camera"}
//             </div>
//           </div>
//         </div>

//         {/* OR divider */}
//         <div className="flex items-center gap-3.5 px-5 my-3.5">
//           <div className={`flex-1 h-px ${dark ? "bg-[rgba(180,155,90,0.14)]" : "bg-[rgba(180,155,90,0.18)]"}`} />
//           <span className={`text-[10.5px] tracking-[2px] uppercase font-light ${t.textHint}`}>
//             or enter manually
//           </span>
//           <div className={`flex-1 h-px ${dark ? "bg-[rgba(180,155,90,0.14)]" : "bg-[rgba(180,155,90,0.18)]"}`} />
//         </div>

//         {/* Table number card */}
//         <div className={`mx-5 ${t.surface} border ${t.border} rounded-[20px] overflow-hidden`}>
//           <div className={`flex items-center gap-3 px-5 py-4 border-b ${t.border}`}>
//             <div
//               className={`w-[38px] h-[38px] rounded-[11px] flex items-center justify-center flex-shrink-0 ${t.surface2} border ${t.border}`}
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//                 stroke={gold} strokeWidth="1.8" strokeLinecap="round">
//                 <path d="M3 10h11M3 6h18M3 14h6m4 0l4 4 4-4m-4-7v11"/>
//               </svg>
//             </div>
//             <div>
//               <div className={`font-cormorant text-[17px] font-medium ${t.text}`}>Table Number</div>
//               <div className={`text-[12px] font-light mt-0.5 ${t.textMuted}`}>
//                 Select or type your table
//               </div>
//             </div>
//           </div>

//           <div className="px-5 pt-4 pb-5">
//             <div className={`text-[10.5px] tracking-[2px] uppercase font-light mb-2.5 ${t.textHint}`}>
//               Table No.
//             </div>

//             {/* Input */}
//             <div className="relative">
//               <svg
//                 className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-35 pointer-events-none"
//                 width="15" height="15" viewBox="0 0 24 24" fill="none"
//                 stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
//               >
//                 <rect x="3" y="9" width="18" height="11" rx="2"/>
//                 <path d="M8 9V7a4 4 0 018 0v2"/>
//               </svg>
//               <input
//                 type="number"
//                 value={tableValue}
//                 onChange={(e) => handleInput(e.target.value)}
//                 placeholder="e.g. 12"
//                 className={`
//                   no-spinner w-full h-[52px] pl-10 pr-4
//                   font-cormorant text-[24px] font-medium tracking-[3px]
//                   ${t.inputBg} border ${t.border} rounded-xl
//                   ${t.text} outline-none transition-all
//                   focus:border-[rgba(201,168,76,0.6)] focus:ring-2 focus:ring-[rgba(201,168,76,0.1)]
//                   placeholder:font-outfit placeholder:text-[14px] placeholder:tracking-normal
//                   placeholder:font-light
//                 `}
//                 style={{ colorScheme: dark ? "dark" : "light" }}
//               />
//             </div>

//             {/* Quick picks */}
//             <div className="grid grid-cols-5 gap-1.5 mt-2.5">
//               {QUICK_TABLES.map((n) => {
//                 const sel = parseInt(tableValue) === n;
//                 return (
//                   <button
//                     key={n}
//                     onClick={() => pick(n)}
//                     className={`
//                       h-[38px] rounded-[9px] border text-[13px] font-medium font-outfit
//                       transition-all
//                       ${sel
//                         ? "border-[#C9A84C] text-[#C9A84C] bg-[rgba(201,168,76,0.12)]"
//                         : `${t.qbBase} hover:border-[rgba(201,168,76,0.4)] hover:text-[#C9A84C]`
//                       }
//                     `}
//                   >
//                     {n}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Continue button */}
//         <button
//           onClick={handleContinue}
//           disabled={!isValid}
//           className={`
//             mx-5 mt-4 w-[calc(100%-40px)] h-[54px] rounded-[14px]
//             flex items-center justify-center gap-2.5
//             font-cormorant text-[18px] font-medium tracking-wide
//             transition-colors duration-300
//             ${isValid
//               ? "bg-[#C9A84C] text-[#1A1308] cursor-pointer active:scale-[0.98]"
//               : dark
//                 ? "bg-[#252219] text-[#4A4438] cursor-not-allowed"
//                 : "bg-[#E8E3DA] text-[#B5ADA3] cursor-not-allowed"
//             }
//           `}
//         >
//           Continue
//           <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
//             stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//             <path d="M5 12h14M13 6l6 6-6 6"/>
//           </svg>
//         </button>

//         <div className={`mt-7 text-center text-[10.5px] tracking-wide font-light ${t.textHint}`}>
//           NoQ · Hotel Waiter Management
//         </div>
//       </div>

//       {/* Keyframe animations — inject once */}
//       <style>{`
//         @keyframes laser {
//           0%   { top: 12px;  opacity: 0; }
//           15%  { opacity: 1; }
//           85%  { opacity: 1; }
//           100% { top: 164px; opacity: 0; }
//         }
//         @keyframes dpulse {
//           0%,100% { opacity: 0.35; transform: scale(0.9); }
//           50%      { opacity: 1;    transform: scale(1.15); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(8px); }
//           to   { opacity: 1; transform: translateY(0);   }
//         }
//         .animate-fadeIn { animation: fadeIn 0.4s ease both; }
//         .no-spinner::-webkit-outer-spin-button,
//         .no-spinner::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
//         .no-spinner { -moz-appearance: textfield; }
//       `}</style>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  QrCode,
  UtensilsCrossed,
  ArrowRight,
  Hash,
  Sun,
  Moon,
} from 'lucide-react';

export default function RestaurantOrderingLanding() {
  const [tableNumber, setTableNumber] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleTableChange = (e) => {
    setTableNumber(e.target.value.replace(/\D/g, ''));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 text-slate-900 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-slate-100">
      <main className="flex min-h-screen items-center justify-center px-4 py-8">
        <section className="w-full max-w-md rounded-[28px] border border-sky-100 bg-white/90 shadow-xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/90">
          <header className="flex items-center justify-between border-b border-sky-100 px-6 py-5 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white">
                <UtensilsCrossed className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-400">
                  Company Logo
                </p>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  DineFlow Café
                </h1>
              </div>
            </div>

            {/* <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-100 bg-white text-slate-700 transition hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button> */}
          </header>

          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome! Start your order
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Please select how you want to continue.
            </p>

            <div className="mt-8 space-y-6">
              <button className="w-full rounded-3xl bg-sky-600 p-5 text-left text-white transition hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <QrCode className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Scan QR to start ordering</h3>
                    <p className="mt-2 text-sm text-sky-50/90">
                      Use your phone camera or scanner for the quickest table access.
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </button>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-sky-200 dark:bg-slate-700" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
                  OR
                </span>
                <div className="h-px flex-1 bg-sky-200 dark:bg-slate-700" />
              </div>

              <div className="rounded-3xl border border-sky-100 bg-sky-50/70 p-5 dark:border-slate-700 dark:bg-slate-800/80">
                <label
                  htmlFor="tableNumber"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  Table Number
                </label>
                <input
                  id="tableNumber"
                  type="text"
                  inputMode="numeric"
                  value={tableNumber}
                  onChange={handleTableChange}
                  placeholder="Enter Table Number"
                  className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400 dark:focus:ring-sky-900"
                />
                <button className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}