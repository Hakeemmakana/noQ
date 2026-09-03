// src/features/admin/orders/services/orderService.ts

import tenantApi from "../../../../services/tenantApi";
import getErrorMessage from "../../../../utils/getErrorMessage";

export const checkoutService = {
  async payRemainingAmount() {
    try {
      const res = await tenantApi.post('/remainingAmount');
      return res?.data
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  
};