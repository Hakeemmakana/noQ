import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { checkoutService } from "../service/checkoutService";
import CheckoutItemCard from "../components/CheckoutItemCard";
import CheckoutSummary from "../components/CheckoutSummary";
import CheckoutEmpty from "../components/CheckoutEmpty";
import CheckoutSkeleton from "../components/CheckoutSkeleton";
import type { CheckoutItem } from "../types/checkoutTypes";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import StockIssueModal from "../components/StockIssueModal";
import { useNavigate } from "react-router-dom";

const GST_PERCENTAGE = 18;
type StockIssueItem = {
  productId: string;
  productName: string;
  availableStock: number;
  requestedQty: number;
};

type CheckoutModalState =
  | { type: null }
  | { type: "stock-issue"; items: StockIssueItem[] }
  | { type: "order-success"; orderId: string }
  | { type: "payment-success"; clientSecret: string; paymentIntentId: string }
  | { type: "stripe-payment"; clientSecret: string; paymentIntentId: string };


const CheckoutPage = () => {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<CheckoutModalState>({ type: null });
  const closeModal = () => setModal({ type: null });
  const tableId = useSelector((state: RootState) => state.table.tableId) ?? ''
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);
  const navigate = useNavigate()
  const gst = useMemo(() => {
    return (subtotal * GST_PERCENTAGE) / 100;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + gst;
  }, [subtotal, gst]);

  const getCheckoutData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await checkoutService.getCheckout();
      setItems(response?.items || []);
    } catch (err: unknown) {
      const message = typeof err=='string'
        ? err
        : "Failed to complete payment";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCheckoutData();
  }, []);



  const handleOrderNow = async () => {
    try {
      setActionLoading(true);
      setError("");
      const orderType = "ORDER_NOW";
      const res = await checkoutService.orderNow({ orderType, tableId })
      if (res?.message === "STOCK_ISSUE") {
        setModal({
          type: "stock-issue",
          items: res?.data?.items || [],
        });
        return;
      }
      if (res?.message === "ORDER_SUCCESS") {
        navigate(`/orderSuccess?orderId?=${res?.data?.orderId}`, {
          state: {
            itemLength: res?.data?.itemLength
          }
        });
        return
        // setModal({
        //   type: "order-success",
        //   orderId: res?.data?.orderId,
        // });
        // return;
      }

    } catch (err:unknown) {
      const message=typeof err=='string'
      ?err
      :'Failed to place order'
      setError(message);
    } finally {
      setActionLoading(false);
    }
  };

  const handlePayAndOrder = async () => {
    try {
      setActionLoading(true);
      setError("");
      const orderType = "PAY_AND_ORDER";
      const res = await checkoutService.payAndOrder({ orderType, tableId });
      if (res?.message === "STOCK_ISSUE") {
        setModal({
          type: "stock-issue",
          items: res?.data?.items || [],
        });
        return;
      }

      if (res?.message === "STRIPE_PAYMENT") {
        // setModal({
        //   type: "stripe-payment",
        //   clientSecret:res.data.clientSecret,
        //   paymentIntentId:res.data.paymentIntentId
        // });
        // // <StripePaymentModal 
        // // clientSecret={res.data.clientSecret} 
        // // paymentIntentId={res.data.paymentIntentId} 
        // // onClose={() => setModal({ type: null })}
        // // />
        // return;
        const { clientSecret, paymentIntentId } = res.data;
        navigate("/checkout/payment", {
          state: { clientSecret, paymentIntentId }
        });
        return;
      }
    } catch (err: unknown) {
      const message = typeof err == 'string'
        ? err
        : "Failed to complete payment"
      setError(message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBackToCart = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CheckoutSkeleton />
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CheckoutEmpty onBackToCart={handleBackToCart} />
        </div>
      </div>
    );
  }
  // const goToOrders = () => {
  //   if (modal.type === "order-success") {
  //     navigate(`/orders/${modal.orderId}`);
  //     return;
  //   }

  //   navigate("/orders");
  // };

  // const goToMenu = () => {
  //   navigate("/menu");
  // };

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={handleBackToCart}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cart
                </button>

                <div className="hidden h-6 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

                <div className="min-w-0">
                  <h1 className="truncate text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Checkout
                  </h1>
                  <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                    Review your items and complete the order
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 md:flex">
                <ShieldCheck className="h-4 w-4" />
                Secure checkout
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {error ? (
              <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
                {error}
              </div>
            ) : null}

            <div className="grid gap-8 lg:grid-cols-[1.2fr_420px]">
              <section className="min-w-0">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    {/* <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Cart Preview
                </p> */}
                    <h2 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                      Your selected items
                    </h2>
                  </div>

                  <div className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {items.length} item{items.length > 1 ? "s" : ""}
                  </div>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <CheckoutItemCard key={item.id} item={item} />
                  ))}
                </div>
              </section>

              <section>
                <CheckoutSummary
                  subtotal={subtotal}
                  gst={gst}
                  total={total}
                  itemCount={items.length}
                  loading={actionLoading}
                  onOrderNow={handleOrderNow}
                  onPayAndOrder={handlePayAndOrder}
                />
              </section>
            </div>
          </main>
        </div>

      </div>

      <StockIssueModal
        open={modal.type === "stock-issue"}
        items={modal.type === "stock-issue" ? modal.items : []}
        onClose={closeModal}
      />


      {/* {modal.type === "stripe-payment" && (<StripePaymentModal
        clientSecret={modal.clientSecret}
        paymentIntentId={modal.paymentIntentId}
        onClose={() => setModal({ type: null })}
      />)} */}
    </>
  );
};

export default CheckoutPage;