// src/modules/menu/services/menu.service.ts
import tenantApi from "../../../../services/tenantApi";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type { MenuFilters } from "../types/menuTypes";
export const menuService = {
  async getMenu(filterData: MenuFilters, page = 1) {
    try {
      const filters = JSON.stringify(filterData);

      const res = await tenantApi.get('/menu', {
        params: { page,filters },
      });
      return res?.data?.data;
      
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async getCategories() {
    try {
      const res = await tenantApi.get('/category');
      return res?.data?.data || [];
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};