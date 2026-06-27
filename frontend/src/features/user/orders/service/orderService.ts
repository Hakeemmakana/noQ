// src/features/admin/orders/services/orderService.ts

import tenantApi from "../../../../services/tenantApi";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type { IOrder } from "../types/orderTypes";

export const orderService = {
  async getAllOrders() {
    try {
      const res = await tenantApi.get('/orders');
      return res?.data?.data as IOrder[];
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async getOrderById(id: string) {
    try {
      const res = await tenantApi.get(`/order/${id}`);
      return res?.data?.data as IOrder;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};