import {  Types, QueryFilter } from "mongoose";
import Table, { ITable } from "../../../models/table";
import { BaseRepository } from "../../IBaseRepository";
import { ITableRepository } from "../interfaces/ITableRepository";
import { PaginatedResult } from "../../../types/pagination";

type CreateTableData = Partial<ITable> & {
  hotelId:Types.ObjectId
};
export default class TableRepository extends BaseRepository<ITable> implements ITableRepository {
    constructor() {
        super(Table)
    }
    async createTable(data: Partial<ITable>,hotelId:string): Promise<ITable> {
        const hotelObjectId=new Types.ObjectId(hotelId)
                const tableData:CreateTableData={
                    ...data,
                    isDeleted:false,
                    hotelId:hotelObjectId
                }
        return await this.create(tableData);
    }
    async getAllTable(search: string, page: number, limit: number, hotelId: string): Promise<PaginatedResult<ITable>> {
        const hotelObjectId=new Types.ObjectId(hotelId)
        const filter:QueryFilter<ITable> = {
            isDeleted: false,
            hotelId: hotelObjectId
        }
        if (search) {
            filter.$or = [
                { tableNumber: { $regex: `^${search}`, $options: 'i' } },
            ]
        }
        return await this.getPaginatedData(filter, page, limit)
    }
    async getTableById(id: string): Promise<ITable | null> {
        return await this.getById(id)
    }
    async updateTable(id: string, data: Partial<ITable>): Promise<ITable | null> {
        return await this.updateById(id, data)
    }
    async statusChangeTable(id: string, status: string): Promise<ITable | null> {
        const updateData = {
            isAvailable: status === 'active'
        }
        return await this.updateById(id, updateData)
    }
    async deleteTable(id: string): Promise<ITable | null> {
        return await this.deleteById(id);
    }
    async findByName(name: string, hotelId: string, excludeId?: string): Promise<ITable | null> {
       const hotelObjectId=new Types.ObjectId(hotelId)
        const query: QueryFilter<ITable> = {
            tableNumber: { $regex: name, '$options': 'i' },
            hotelId: hotelObjectId
        }
        if (excludeId) {
            query._id = { $ne: excludeId }
        }
        return await this.getByFilter(query)
    }
    async getTableWithHotelDetails(id: string): Promise<ITable |null> {
       return  await this.getByIdWithPopulate(id).populate('hotelId')
    }
}