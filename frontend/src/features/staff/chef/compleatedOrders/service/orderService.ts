import staffApi from "../../../../../services/staffApi";
import { CHEF_ROUTE } from "../../../../../shared/constants/apiRoutes";;
import getErrorMessage from "../../../../../utils/getErrorMessage";
import type { CompletedOrderQuery, IOrderType,  } from "../types/orderTypes";

const ORDERS_BASE = `/${CHEF_ROUTE}/orders`;

  export const orderService = {
  async getCompletedOrders(query: CompletedOrderQuery) {
    try {
      const res = await staffApi.get(`${ORDERS_BASE}/completed`, {
        params: query,
      });

      return {
        data: (res.data.data.data|| []) as IOrderType[],
        total: ( 1) as number,
        page: query.page,
        limit: query.limit,
      };
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};
 