// src/modules/menu/services/cart.service.ts
import tenantApi from "../../../../services/tenantApi";
import getErrorMessage from "../../../../utils/getErrorMessage";

export const cartService = {
  async getCart() {
    try {
      const res = await tenantApi.get('/cartWithProduct');
      console.log(res.data.cartData)
      return res?.data?.cartData;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async addToCart(productId: string) {
    try {
      console.log('addtoCart',productId)
      const res = await tenantApi.post('/addToCart', {
        itemId:productId,
      });
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async dicrementQuantity(productId: string) {
    try {
      const res = await tenantApi.patch(`/removeFromCart/${productId}`);
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async removeFromCart(productId: string) {
    try {
      const res = await tenantApi.patch(`/deleteProductFromCart/${productId}`);
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};