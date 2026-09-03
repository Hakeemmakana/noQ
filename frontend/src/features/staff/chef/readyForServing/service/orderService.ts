import staffApi from "../../../../../services/staffApi";
import { CHEF_ROUTE, } from "../../../../../shared/constants/apiRoutes";;
import getErrorMessage from "../../../../../utils/getErrorMessage";
import type { IOrderType } from "../types/orderTypes";
const orders='orders'
export const orderService = {
  async getNewOrders() {
    try {
      const res = await staffApi.get(`/${CHEF_ROUTE}/${orders}/readyToServe`);
      return (res?.data?.data || []) as IOrderType[];
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
  
};