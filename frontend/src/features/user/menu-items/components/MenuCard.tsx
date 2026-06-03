// src/modules/menu/components/MenuCard.tsx
import { useState } from "react";
import CartQuantityControl from "./CartQuantityControl";
import type { IMenuProduct } from "../types/menuTypes";
import { cartService } from "../service/cartService";
import { errorToast, successToast } from "../../../../shared/utils/toastNotification";

type Props = {
  item: IMenuProduct;
};

export default function MenuCard({ item }: Props) {
  const [cartCount, setCartCount] = useState(item.cartCount || 0);
  const [loading, setLoading] = useState(false);

  const handleIncrease = async () => {
    try {
      setLoading(true);

      
        await cartService.addToCart(item.id);
        setCartCount((prev) => prev + 1);
      
      successToast("Cart updated");
    } catch (error) {
      errorToast(String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async () => {
    try {
      setLoading(true);

      if (cartCount <= 1) {
        await cartService.removeFromCart(item.id);
        setCartCount(0);
      } else {
        await cartService.dicrementQuantity(item.id);
        setCartCount((prev) => prev - 1);
      }

      successToast("Cart updated");
    } catch (error) {
      errorToast(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <img
        src={item.productImage}
        alt={item.productName}
        className="h-48 w-full object-cover"
      />

      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-white">
              {item.productName}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {typeof item.category === "string"
                ? item.category
                : item.category?.name}
            </p>
          </div>

          <span className="shrink-0 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            ₹{item.price}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              item.status === "available"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            }`}
          >
            {item.status === "available" ? "Available" : "Unavailable"}
          </span>

          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {item.type === "quick" ? "Quick Item" : "Kitchen"}
          </span>
        </div>

        <CartQuantityControl
          value={cartCount}
          loading={loading}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </div>
    </div>
  );
}