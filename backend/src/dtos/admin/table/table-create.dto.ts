export interface ITableDto{
    tableNumber:string;
    seatingCapacity:number;
    isAvailable:boolean;

}
export interface ITableReqDto{
    number:string;
    capacity:number;
    status:'active'|'inactive'
}
export interface getOneTable{
    tableId:string;
    hotelId:string;
}
export interface IGetTableDto{
    searchVal:string;
    page:number;
}
export const convertTableDto=(data:ITableReqDto):ITableDto=>{
    return {
        tableNumber:data.number ??'',
        seatingCapacity:data.capacity ??'',
        isAvailable:data.status=='active'

    }
}
export const getTableDto=(data:IGetTableDto):IGetTableDto=>{
    return {
        searchVal:data.searchVal??'',
        page:data.page??1

    }
}
export const getOneTableDto=(data:getOneTable):getOneTable=>{
    return {
        tableId:data.tableId,
        hotelId:data.hotelId
    }
}