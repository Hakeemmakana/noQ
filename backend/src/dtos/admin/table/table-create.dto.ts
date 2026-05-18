export interface ICreateTableDto{
    tableNumber:string;
    seatingCapacity:number;
    isAvailable:boolean;

}
interface fromFrontData{
    number:string;
    capacity:number;
    status:'active'|'inactive'
}
export interface IGetTableDto{
    searchVal:string;
    page:number;
}
export const createTableDto=(data:fromFrontData):ICreateTableDto=>{
    return {
        tableNumber:data.number ??'',
        seatingCapacity:data.capacity ??'',
        isAvailable:data.status=='active'

    }
}
export const getTableDto=(data:Partial<IGetTableDto>):IGetTableDto=>{
    return {
        searchVal:data.searchVal??'',
        page:data.page??1

    }
}