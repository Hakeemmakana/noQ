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