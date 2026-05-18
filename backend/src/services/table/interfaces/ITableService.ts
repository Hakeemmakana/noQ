import { ITable } from "../../../models/table";
import { PaginatedResult } from "../../../types/pagination";

export default interface ITableService {
    getAllTable(searchVal: string, page: number, hotelId: string): Promise<PaginatedResult<ITable>>;
    createTable(data: Partial<ITable>, hotelId: string): Promise<ITable>;
    statusChangeTable(id: string, hotelId: string, status: "active" | "inactive"): Promise<ITable | null>;
    updateTable(id: string, hotelId: string, data: Partial<ITable>): Promise<ITable | null>;
    deleteTable(id: string, hotelId: string): Promise<ITable | null>;
    getTable(id:string,hotelId:string):Promise<ITable|null>
}