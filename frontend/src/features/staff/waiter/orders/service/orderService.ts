import staffApi from "../../../../../services/staffApi";
import {  WAITER_ROUTE } from "../../../../../shared/constants/apiRoutes";
import getErrorMessage from "../../../../../utils/getErrorMessage";
import type { IOrderType } from "../types/orderTypes";

const ORDERS_BASE = `/${WAITER_ROUTE}/orders`;

export const orderService = {
  async getOrdersWithoutComplete({page, limit}: { page: number; limit: number }) {
    try {
  
    const res = await staffApi.get(`${ORDERS_BASE}/without-complete`, {
        params: { page, limit },
      });
      return {
        data: (res?.data?.data?.data || []) as IOrderType[],
        total: (res?.data?.data?.total || 1) as number,
        limit:(res?.data.data.limit||8)as number
      };
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};