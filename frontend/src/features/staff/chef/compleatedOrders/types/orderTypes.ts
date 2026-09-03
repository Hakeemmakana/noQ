export interface IOrderType {
  _id: string;
  table: string;
  userName: string;
  product: string;
  productQuantity: number;
  time: string; 
}
export interface IOrderType {
  _id: string;
  table: string;
  userName: string;
  product: string;
  productQuantity: number;
  time: string; 
  orderId:IOrderId;
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