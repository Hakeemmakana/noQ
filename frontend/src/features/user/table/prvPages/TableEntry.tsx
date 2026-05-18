

import  {  useState } from 'react';
import {
  QrCode,
  UtensilsCrossed,
  ArrowRight,
  // Hash,
  // Sun,
  // Moon,
} from 'lucide-react';

export  default function RestaurantOrderingLanding() {
  const [tableNumber, setTableNumber] = useState('');
  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   const root = document.documentElement;
  //   if (darkMode) {
  //     root.classList.add('dark');
  //   } else {
  //     root.classList.remove('dark');
  //   }
  // }, [darkMode]);

  const handleTableChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
                  {/* Company Logo */}
                </p>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  NoQ
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