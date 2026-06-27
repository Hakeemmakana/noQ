// src/features/admin/orders/service/orderService.ts

import adminApi from "../../../../services/adminApi";
import { ADMIN_ROUTE } from "../../../../shared/constants/apiRoutes";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type { IOrder } from "../types/orderTypes";

export interface IGetOrdersParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface IGetOrdersResponse {
  data: IOrder[];
  total: number;
  page: number;
  limit: number;
}

export const orderService = {
  async getAllOrders(params: IGetOrdersParams = {}) {
    try {
      const { search = "", page = 1} = params;

      const res = await adminApi.get(`/${ADMIN_ROUTE}/orders`, {
        params: { search, page },
      });

      return res?.data?.data as IGetOrdersResponse;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async getOrderById(id: string) {
    try {
      const res = await adminApi.get(`/${ADMIN_ROUTE}/order/${id}`);
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};