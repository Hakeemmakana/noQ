// src/modules/menu/components/cart/CartItemCard.tsx
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "../types/cartTypes";

type Props = {
  item: CartItem
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  loading?: boolean;
};

const CartItemCard: React.FC<Props> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  loading = false,
}) => {
    const product=  item;
  const productId = product?.id || item.productId || "";
  const quantity = item.quantity || 1;
  const unitPrice = product?.price ?? item.price ?? 0;
  const itemTotal = unitPrice * quantity;

  if (!product) return null;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
          {product.productImage ? (
            <img
              src={product.productImage}
              alt={product.productImage}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
              No image
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="space-y-1">
            <h3 className="line-clamp-1 text-base font-semibold text-slate-900 dark:text-white">
              {product.productName}
            </h3>

            {product.description && (
              <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                {product.description}
              </p>
            )}

            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              ₹{unitPrice.toFixed(2)} each
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
              <button
                onClick={() => onDecrease(productId)}
                disabled={loading}
                className="flex h-10 w-10 items-center justify-center text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-700"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span className="min-w-[44px] text-center text-sm font-semibold text-slate-900 dark:text-white">
                {quantity}
              </span>

              <button
                onClick={() => onIncrease(productId)}
                disabled={loading}
                className="flex h-10 w-10 items-center justify-center text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-700"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-base font-bold text-slate-900 dark:text-white">
                ₹{itemTotal.toFixed(2)}
              </p>

              <button
                onClick={() => onRemove(productId)}
                disabled={loading}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/40"
                aria-label="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;