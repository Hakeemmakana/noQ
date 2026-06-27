// src/modules/menu/pages/CartPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";
import { cartService } from "../service/cartService";
import type { CartItem } from "../types/cartTypes";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCartItems(data?.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleIncrease = async (productId: string) => {
    try {
      setActionId(productId);
      await cartService.addToCart(productId);
      await loadCart();
    } catch (error) {
      console.error(error);
    } finally {
      setActionId(null);
    }
  };

  const handleDecrease = async (productId: string) => {
    try {
      setActionId(productId);
      await cartService.dicrementQuantity(productId);
      await loadCart();
    } catch (error) {
      console.error(error);
    } finally {
      setActionId(null);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      setActionId(productId);
      await cartService.removeFromCart(productId);
      await loadCart();
    } catch (error) {
      console.error(error);
    } finally {
      setActionId(null);
    }
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const product = item.product || item.item;
      const price = product?.price ?? item.price ?? 0;
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);
  }, [cartItems]);

  const itemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [cartItems]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl animate-pulse space-y-4">
          <div className="h-8 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800"
                />
              ))}
            </div>
            <div className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <ShoppingCart className="text-slate-600 dark:text-slate-300" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add products to your cart and they will appear here.
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="mt-6 inline-flex rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
          >
            Browse menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
              Cart
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Shopping cart
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Review your items before checkout.
            </p>
          </div>
        </div>
    {/* <div>
        <button onClick={deleteConfrim}>confirm</button>
        <button>cancel</button>
    </div> */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-4">
            {cartItems.map((item, index) => {
              const product = item.product || item.item;
              const productId = product?.id || item.productId || `${index}`;

              return (
                <CartItemCard
                  key={productId}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                  loading={actionId === productId}
                />
              );
            })}
          </section>

          <CartSummary
            subtotal={subtotal}
            itemCount={itemCount}
            onCheckout={() => navigate("/checkout")}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;