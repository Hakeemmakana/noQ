import staffApi from "../../../../../services/staffApi";
import { CHEF_ROUTE, } from "../../../../../shared/constants/apiRoutes";;
import getErrorMessage from "../../../../../utils/getErrorMessage";
import type { IOrderType } from "../types/orderTypes";
const orders='orders'

export const orderService = {
  async getAcceptedOrders() {
    try {
      const res = await staffApi.get(`/${CHEF_ROUTE}/${orders}/accepted`);
      return (res?.data?.data || []) as IOrderType[];
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
  async redayOrder(orderId: string) {
    try {
      const res = await staffApi.patch(`/${CHEF_ROUTE}/${orders}/${orderId}/readyToServe`);
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};