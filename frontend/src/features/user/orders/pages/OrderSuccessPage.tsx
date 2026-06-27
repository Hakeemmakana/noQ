// src/features/user/orders/pages/OrderSuccessPage.tsx

import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 dark:border-gray-800 dark:bg-gray-900 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6 flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
            <div className="absolute inset-0 rounded-full bg-green-100 dark:bg-green-900/20 animate-ping opacity-75" />
            <div className="absolute inset-2 rounded-full border-4 border-green-200 dark:border-green-800" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/20 sm:h-24 sm:w-24">
              <svg
                className="h-10 w-10 animate-[successTick_0.6s_ease-in-out_forwards] text-white sm:h-12 sm:w-12"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 27L22 35L38 18"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  className="success-check-path"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">Order placed successfully</h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
            Your order has been confirmed and sent successfully. You can continue
            browsing the menu or check your order details from the orders page.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => navigate("/menu")}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Go to Menu
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-900"
            >
              Go to Orders
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .success-check-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawTick 0.7s ease-in-out forwards 0.2s;
        }

        @keyframes drawTick {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes successTick {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          60% {
            transform: scale(1.08);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessPage;