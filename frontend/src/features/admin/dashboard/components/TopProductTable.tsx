import React from "react";
import type { TopProduct } from "../types/dashboard";
import DashboardSectionCard from "./DashboardSectionCard";

interface TopProductsTableProps {
  products: TopProduct[];
  // onViewAll: () => void;
}

// Fallback image: you can put a real image in /public and reference it,
// or use a data URL / placeholder service.
const FALLBACK_PRODUCT_IMAGE = "/images/fallback-product.svg";

const TopProductsTable: React.FC<TopProductsTableProps> = ({
  products,
  // onViewAll,
}) => {
 
  return (
    <DashboardSectionCard className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-5 sm:px-6">
        <h3 className="text-xl font-bold tracking-[-0.03em] text-[#171A28] sm:text-2xl">
          Top Selling Products
        </h3>
        {/* <button
          onClick={onViewAll}
          className="text-sm font-bold text-[#1F27FF]"
        >
          Show More
        </button> */}
      </div>

      <div className="hidden md:block">
        <table className="w-full border-t border-[#ECECF3]">
          <thead className="bg-[#FAFAFD]">
            <tr className="text-left text-xs font-bold uppercase tracking-[0.08em] text-[#8A8EA6]">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4 text-right">Quantity</th>
              <th className="px-6 py-4 text-right">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => {
              const imgUrl =
                item.productImage && item.productImage.trim() !== ""
                  ? item.productImage
                  : FALLBACK_PRODUCT_IMAGE;

              return (
                <tr key={item.productId} className="border-t border-[#ECECF3]">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={imgUrl}
                        alt={item.productName}
                        className="h-10 w-10 rounded-xl object-cover ring-1 ring-[#E8E8F0]"
                        onError={(e) => {
                          // If image fails, fallback to default
                          (e.target as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE;
                        }}
                      />
                      <span className="text-sm font-bold text-[#31364A]">
                        {item.productName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right text-sm text-[#4C5168]">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-5 text-right text-sm font-bold text-[#1E2233]">
                    ₹{item.revenue.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 p-4 md:hidden">
        {products.map((item) => {
          const imgUrl =
            item.productImage && item.productImage.trim() !== ""
              ? item.productImage
              : FALLBACK_PRODUCT_IMAGE;

          return (
            <div
              key={item.productId}
              className="rounded-2xl border border-[#ECECF3] bg-[#FCFCFE] p-4"
            >
              <div className="flex items-start gap-3">
                <img
                  src={imgUrl}
                  alt={item.productName}
                  className="h-12 w-12 rounded-xl object-cover ring-1 ring-[#E8E8F0]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE;
                  }}
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#25293B]">
                    {item.productName}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-sm text-[#555B73]">
                    <span>Qty: {item.quantity}</span>
                    <span className="font-bold text-[#1E2233]">
                      ₹{item.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardSectionCard>
  );
};

export default TopProductsTable;