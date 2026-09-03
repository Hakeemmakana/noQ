import staffApi from "../../../../../services/staffApi";
import {  WAITER_ROUTE } from "../../../../../shared/constants/apiRoutes";;
import getErrorMessage from "../../../../../utils/getErrorMessage";
import type { INewOrder } from "../types/orderTypes";
const orders='orders'

export const orderService = {
  async getQuickOrders() {
    try {
      const res = await staffApi.get(`/${WAITER_ROUTE}/${orders}/quickItem`);
      return (res?.data?.data || []) as INewOrder[];
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
  async servedOrder(orderId: string) {
    try {
      const res = await staffApi.patch(`/${WAITER_ROUTE}/${orders}/${orderId}/completed`);
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};