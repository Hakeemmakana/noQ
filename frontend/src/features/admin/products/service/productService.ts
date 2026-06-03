// productService.ts
import adminApi from "../../../../services/adminApi";
import { ADMIN_ROUTE } from "../../../../shared/constants/apiRoutes";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type { ICategory } from "../types/productTypes";

export const productService = {
  async getProducts(searchVal = "", page = 1, limit = 10) {
    try {
      const res = await adminApi.get(`/${ADMIN_ROUTE}/menu`, {
        params: { searchVal, page, limit },
      });
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async getCategories() {
    try {
      const res = await adminApi.get(`/${ADMIN_ROUTE}/category`);
      return res?.data?.data?.data as ICategory[];
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async addProduct(data: FormData) {
    try {
      const res = await adminApi.post(`/${ADMIN_ROUTE}/menu`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async editProduct(id: string, data: FormData) {
    try {
      const res = await adminApi.put(`/${ADMIN_ROUTE}/menu/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(id,data)
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async deleteProduct(id: string) {
    try {
      const res = await adminApi.delete(`/${ADMIN_ROUTE}/menu/${id}`);
      return res?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};