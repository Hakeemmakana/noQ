import tenantApi from "../../../../services/tenantApi";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type { IMenuItem } from "../types/menuProductType";

export const menuProductService = {
  async getProductById(productId: string) {
    try {
      const res = await tenantApi.get(`/menu/${productId}`);
      return res?.data?.data as IMenuItem;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};