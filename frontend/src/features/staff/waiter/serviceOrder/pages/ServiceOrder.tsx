import { useEffect, useState } from "react";
import { orderService } from "../service/orderService";
import type { INewOrder } from "../types/orderTypes";
import ServiceOrderCard from "../components/ServiceOrderCard";
import { errorToast, successToast } from "../../../../../shared/utils/toastNotification";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import { getSocket } from "../../../../../socket.ts/socket";

type TabKey = "ready" | "picked";

export default function ServiceOrderPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("ready");

  const [readyOrders, setReadyOrders] = useState<INewOrder[]>([]);
  const [pickedOrders, setPickedOrders] = useState<INewOrder[]>([]);

  const [loadingReady, setLoadingReady] = useState(false);
  const [loadingPicked, setLoadingPicked] = useState(false);

  const [actionId, setActionId] = useState<string | null>(null);

  const fetchReady = async () => {
    try {
      setLoadingReady(true);
      const data = await orderService.getReadyToServe();
      setReadyOrders(data);
    } catch (error) {
      errorToast(String(error));
    } finally {
      setLoadingReady(false);
    }
  };

  const hotelId = useSelector(
    (state: RootState) => state.staffAuth.staff?.hotelId
  );
  useEffect(() => {
    if (!hotelId ) return;
    const socket = getSocket();

    socket.emit("joinHotelRoom", { hotelId:hotelId })
    const eventName = `updateCardForWaiter`

    socket.on(eventName, (res) => {
      setReadyOrders(prev=>[res.data[0],...prev])
    });
    return () => {
      socket.off(eventName);
    };
  }, [hotelId])

  const fetchPicked = async () => {
    try {
      setLoadingPicked(true);
      const data = await orderService.getPickedOrders();
      setPickedOrders(data);
    } catch (error) {
      errorToast(String(error));
    } finally {
      setLoadingPicked(false);
    }
  };

  useEffect(() => {
    fetchReady();
    fetchPicked();
  }, []);

  const handlePick = async (orderId: string) => {
    try {
      setActionId(orderId);
      await orderService.pickOrder(orderId);
      successToast("Order picked");
      await fetchReady();
      await fetchPicked();
    } catch (error) {
      errorToast(String(error));
    } finally {
      setActionId(null);
    }
  };

  const handleComplete = async (orderId: string) => {
    try {
      setActionId(orderId);
      await orderService.completeOrder(orderId);
      successToast("Order completed");
      await fetchPicked();
    } catch (error) {
      errorToast(String(error));
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs for mobile */}
      <div className="flex items-center gap-2 sm:hidden">
        <button
          onClick={() => setActiveTab("ready")}
          className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${
            activeTab === "ready"
              ? "bg-emerald-600 text-white"
              : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          Ready to Serve
        </button>
        <button
          onClick={() => setActiveTab("picked")}
          className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${
            activeTab === "picked"
              ? "bg-emerald-600 text-white"
              : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          Picked
        </button>
      </div>

      {/* Desktop: two columns */}
      <div className="hidden grid-cols-2 gap-4 sm:grid">
        {/* Ready to Serve */}
        <div className="flex flex-col">
          <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Ready to Serve
          </h2>
          <div className="max-h-[70vh] overflow-y-auto pr-1">
            {loadingReady ? (
              <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
                Loading...
              </div>
            ) : readyOrders.length > 0 ? (
              <div className="space-y-3">
                {readyOrders.map((order) => (
                  <ServiceOrderCard
                    key={order._id}
                    order={order}
                    section="ready"
                    actionLoading={actionId === order._id}
                    onAction={handlePick}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
                No ready orders
              </div>
            )}
          </div>
        </div>

        {/* Picked */}
        <div className="flex flex-col">
          <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Picked
          </h2>
          <div className="max-h-[70vh] overflow-y-auto pr-1">
            {loadingPicked ? (
              <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
                Loading...
              </div>
            ) : pickedOrders.length > 0 ? (
              <div className="space-y-3">
                {pickedOrders.map((order) => (
                  <ServiceOrderCard
                    key={order._id}
                    order={order}
                    section="picked"
                    actionLoading={actionId === order._id}
                    onAction={handleComplete}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
                No picked orders
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: single column based on tab */}
      <div className="sm:hidden">
        {activeTab === "ready" ? (
          <div>
            <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Ready to Serve
            </h2>
            <div className="max-h-[70vh] overflow-y-auto pr-1">
              {loadingReady ? (
                <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
                  Loading...
                </div>
              ) : readyOrders.length > 0 ? (
                <div className="space-y-3">
                  {readyOrders.map((order) => (
                    <ServiceOrderCard
                      key={order._id}
                      order={order}
                      section="ready"
                      actionLoading={actionId === order._id}
                      onAction={handlePick}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
                  No ready orders
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Picked
            </h2>
            <div className="max-h-[70vh] overflow-y-auto pr-1">
              {loadingPicked ? (
                <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
                  Loading...
                </div>
              ) : pickedOrders.length > 0 ? (
                <div className="space-y-3">
                  {pickedOrders.map((order) => (
                    <ServiceOrderCard
                      key={order._id}
                      order={order}
                      section="picked"
                      actionLoading={actionId === order._id}
                      onAction={handleComplete}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
                  No picked orders
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}