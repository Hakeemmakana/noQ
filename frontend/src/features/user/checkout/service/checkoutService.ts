import tenantApi from "../../../../services/tenantApi";
import getErrorMessage from "../../../../utils/getErrorMessage";

export interface CartItem {
  id: string;
  productName: string;
  description: string;
  productImage: string;
  price: number;
  type: string;
  quantity: number;
}

export interface CheckoutResponse {
  total: number;
  items: CartItem[];
}

export interface CheckoutSummary {
  subtotal: number;
  gst: number;
  total: number;
  items: CartItem[];
}

export interface OrderItemPayload {
  itemId: string;
  quantity: number;
}

export interface CheckoutPayload {
  orderType: "ORDER_NOW" | "PAY_AND_ORDER";
  tableId:string;
}

export const checkoutService = {
  // async getCart() {
  //   try {
  //     const res = await tenantApi.get("/cartWithProduct");
  //     return res?.data?.cartData;
  //   } catch (error) {
  //     throw getErrorMessage(error);
  //   }
  // },

  async getCheckout(): Promise<CheckoutSummary> {
    try {
      const res = await tenantApi.get("/checkout");
      return res?.data?.data;
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  // async addToCart(productId: string) {
  //   try {
  //     const res = await tenantApi.post("/addToCart", {
  //       itemId: productId,
  //     });
  //     return res?.data?.data;
  //   } catch (error) {
  //     throw getErrorMessage(error);
  //   }
  // },

  // async dicrementQuantity(productId: string) {
  //   try {
  //     const res = await tenantApi.patch(`/removeFromCart/${productId}`);
  //     return res?.data?.data;
  //   } catch (error) {
  //     throw getErrorMessage(error);
  //   }
  // },

  // async removeFromCart(productId: string) {
  //   try {
  //     const res = await tenantApi.patch(`/deleteProductFromCart/${productId}`);
  //     return res?.data?.data;
  //   } catch (error) {
  //     throw getErrorMessage(error);
  //   }
  // },

  async orderNow(payload: CheckoutPayload) {
    try {
      const res = await tenantApi.post("/checkout", payload);
      return res?.data
    } catch (error) {
      throw getErrorMessage(error);
    }
  },

  async payAndOrder(payload: CheckoutPayload) {
    try {
      const res = await tenantApi.post("/checkout",payload);
      return res?.data
    } catch (error) {
      throw getErrorMessage(error);
    }
  },
};