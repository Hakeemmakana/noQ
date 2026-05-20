import {  getOneTable, IGetTableDto, ITableReqDto } from "../../../dtos/admin/table/table-create.dto";
import { IPaginatedTableData, ITableResponseDto, ITablewithHotelDetailsResponseDto } from "../../../dtos/admin/table/table-response.dto";
import { ITable } from "../../../models/table";

export default interface ITableService {
    getAllTable(data:IGetTableDto, hotelId: string): Promise<IPaginatedTableData<ITableResponseDto>>;
    createTable(data: ITableReqDto, hotelId: string): Promise<ITable>;
    statusChangeTable(id: string, hotelId: string, status: "active" | "inactive"): Promise<ITable | null>;
    updateTable(id: string, hotelId: string, data: ITableReqDto): Promise<ITable | null>;
    deleteTable(id: string, hotelId: string): Promise<ITable | null>;
    getTable(data:getOneTable):Promise<ITablewithHotelDetailsResponseDto>
}