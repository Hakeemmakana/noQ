export type OrderStatus = "readyToServe" | "picked" | "completed";

export interface IOrderId {
  tableId: {
    tableNumber: string;
  };
  userId: {
    name: string;
  };
}

export interface INewOrder {
  _id: string;
  table: string;
  userName: string;
  product: string;
  productQuantity: number;
  time: string;
  orderId: IOrderId;
  status?: OrderStatus; // optional, if backend sends it
}