export interface IOrderType {
  _id: string;
  table: string;
  userName: string;
  orderId:IOrderId;
  product: string;
  status:string;
  productQuantity: number;
  time: string;
  completedAt: string;
  waiterName?: string;
}
interface IOrderId{
  tableId:{
    tableNumber:string;
  },
  userId:{
    name:string
  }

}

export type CompletedOrderFilters = {
  waiterFilter: "my-orders" | "all-waiters";
  dateFilter: "today" | "yesterday" | "this-week" | "custom";
  customDateFrom?: string; // YYYY-MM-DD
  customDateTo?: string;   // YYYY-MM-DD
  sort: "latest" | "oldest";
};

export type CompletedOrderQuery = CompletedOrderFilters & {
  page: number;
  limit: number;
};