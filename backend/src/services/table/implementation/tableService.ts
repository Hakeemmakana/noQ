import { inject, injectable } from "inversify";
import ITableService from "../interfaces/ITableService";
import { TYPES } from "../../../DI/types";
import { ITableRepository } from "../../../repositories/table/interfaces/ITableRepository";
import { ITable } from "../../../models/table";
import { AppError } from "../../../middleware/errorHandler";
import { TABLE_NAME_EXIST, TABLE_NOT_AVAILABLE, TABLE_NOT_EXIST } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import { PaginatedResult } from "../../../types/pagination";
@injectable()
export default class TableService implements ITableService {
    constructor(@inject(TYPES.TableRepository) private _tableRepository: ITableRepository) { }

    createTable = async (data: Partial<ITable>, hotelId: string): Promise<ITable> => {
        if (data.tableNumber) {
            const existTable = await this._tableRepository.findByName(data.tableNumber, hotelId)
            if (existTable) {
                throw new AppError(TABLE_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        return await this._tableRepository.createTable(data, hotelId)
    }
    getAllTable = async (searchVal: string, page: number, hotelId: string): Promise<PaginatedResult<ITable>> => {
        const limit = 8
        return await this._tableRepository.getAllTable(searchVal, page, limit, hotelId)
    }
    updateTable = async (id: string, hotelId: string, data: Partial<ITable>): Promise<ITable | null> => {
        if (data.tableNumber) {

            const existTableName = await this._tableRepository.findByName(data.tableNumber, hotelId, id)
            if (existTableName) {
                throw new AppError(TABLE_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        const tableIsExist = await this._tableRepository.getTableById(id)
        if (!tableIsExist || tableIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(TABLE_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        return await this._tableRepository.updateTable(id, data)
    }
    statusChangeTable=async(id: string, hotelId: string, status: "active" | "inactive"): Promise<ITable | null> =>{
         const tableIsExist = await this._tableRepository.getTableById(id)
                if (!tableIsExist||tableIsExist.hotelId.toString() !== hotelId) {
                    throw new AppError(TABLE_NOT_EXIST, HttpStatus.NOT_FOUND)
                }
                
                return await this._tableRepository.statusChangeTable(id, status)
    }
    deleteTable=async(id: string, hotelId: string): Promise<ITable | null> =>{
        const tableIsExist = await this._tableRepository.getTableById(id)
                if (!tableIsExist||tableIsExist.hotelId.toString() !== hotelId) {
                    throw new AppError(TABLE_NOT_EXIST, HttpStatus.NOT_FOUND)
                }
                
                return await this._tableRepository.deleteTable(id)
    }
    getTable=async(id: string, hotelId: string): Promise<ITable|null>=> {
        const table=await this._tableRepository.getTableById(id)
        if(!table||table.hotelId.toString()!==hotelId){
            throw new AppError(TABLE_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        if(!table.isAvailable){
            throw new AppError(TABLE_NOT_AVAILABLE, HttpStatus.NOT_FOUND)
        }
        return await this._tableRepository.getTableWithHotelDetails(id)
       
    }
}