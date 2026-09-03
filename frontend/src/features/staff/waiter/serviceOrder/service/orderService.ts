import staffApi from "../../../../../services/staffApi";
import { WAITER_ROUTE } from "../../../../../shared/constants/apiRoutes";
import getErrorMessage from "../../../../../utils/getErrorMessage";
import type { INewOrder } from "../types/orderTypes";

const ORDERS_BASE = `/${WAITER_ROUTE}/orders`;

export const orderService = {
  // Ready to serve
  async getReadyToServe() {
    try {
      const res = await staffApi.get(`${ORDERS_BASE}/readyToServe`);
      return (res?.data?.data || []) as INewOrder[];
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  // Pick order (PATCH)
  async pickOrder(orderId: string) {
    try {
      const res = await staffApi.patch(`${ORDERS_BASE}/${orderId}/picked`);
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  // Picked orders
  async getPickedOrders() {
    try {
        
      const res = await staffApi.get(`${ORDERS_BASE}/picked`);
      return (res?.data?.data || []) as INewOrder[];
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  // Complete order (PATCH)
  async completeOrder(orderId: string) {
    try {
      const res = await staffApi.patch(`${ORDERS_BASE}/${orderId}/completed`);
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};