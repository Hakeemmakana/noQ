import staffApi from "../../../../../services/staffApi";
import { CHEF_ROUTE } from "../../../../../shared/constants/apiRoutes";;
import getErrorMessage from "../../../../../utils/getErrorMessage";
import type { INewOrder } from "../types/orderTypes";
const orders='orders'

export const orderService = {
  async getNewOrders() {
    try {
      const res = await staffApi.get(`/${CHEF_ROUTE}/${orders}/new`);
      return (res?.data?.data || []) as INewOrder[];
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
  async acceptOrder(orderId: string) {
    try {
      const res = await staffApi.patch(`/${CHEF_ROUTE}/${orders}/${orderId}/accept`);
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};