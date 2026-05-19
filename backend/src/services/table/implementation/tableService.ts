import { inject, injectable } from "inversify";
import ITableService from "../interfaces/ITableService";
import { TYPES } from "../../../DI/types";
import { ITableRepository } from "../../../repositories/table/interfaces/ITableRepository";
import { ITable } from "../../../models/table";
import { AppError } from "../../../middleware/errorHandler";
import { TABLE_NAME_EXIST, TABLE_NOT_AVAILABLE, TABLE_NOT_EXIST } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import { PaginatedResult } from "../../../types/pagination";
import { convertTableDto, getOneTable, getOneTableDto, getTableDto, IGetTableDto, ITableReqDto } from "../../../dtos/admin/table/table-create.dto";
import { getTableWithHotelDetails, IPaginatedTableData, ITableResponseDto, ITablewithHotelDetailsResponseDto, toPaginatedTableResponse } from "../../../dtos/admin/table/table-response.dto";
@injectable()
export default class TableService implements ITableService {
    constructor(@inject(TYPES.TableRepository) private _tableRepository: ITableRepository) { }

    createTable = async (data: ITableReqDto, hotelId: string): Promise<ITable> => {
        const dto = convertTableDto(data)
        if (dto.tableNumber) {
            const existTable = await this._tableRepository.findByName(dto.tableNumber, hotelId)
            if (existTable) {
                throw new AppError(TABLE_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        return await this._tableRepository.createTable(dto, hotelId)
    }
    getAllTable = async (data: IGetTableDto, hotelId: string): Promise<IPaginatedTableData<ITableResponseDto>> => {
        const dto = getTableDto(data)
        const limit = 8
        const table= await this._tableRepository.getAllTable(dto.searchVal, dto.page, limit, hotelId)
        const outDto = toPaginatedTableResponse(table)
        return outDto
    }
    updateTable = async (id: string, hotelId: string, data: ITableReqDto): Promise<ITable | null> => {
        const dto = convertTableDto(data)
        if (dto.tableNumber) {

            const existTableName = await this._tableRepository.findByName(dto.tableNumber, hotelId, id)
            if (existTableName) {
                throw new AppError(TABLE_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        const tableIsExist = await this._tableRepository.getTableById(id)
        if (!tableIsExist || tableIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(TABLE_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        return await this._tableRepository.updateTable(id, dto)
    }
    statusChangeTable = async (id: string, hotelId: string, status: "active" | "inactive"): Promise<ITable | null> => {
        const tableIsExist = await this._tableRepository.getTableById(id)
        if (!tableIsExist || tableIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(TABLE_NOT_EXIST, HttpStatus.NOT_FOUND)
        }

        return await this._tableRepository.statusChangeTable(id, status)
    }
    deleteTable = async (id: string, hotelId: string): Promise<ITable | null> => {
        const tableIsExist = await this._tableRepository.getTableById(id)
        if (!tableIsExist || tableIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(TABLE_NOT_EXIST, HttpStatus.NOT_FOUND)
        }

        return await this._tableRepository.deleteTable(id)
    }
    getTable = async (data:getOneTable): Promise<ITablewithHotelDetailsResponseDto> => {
        const tableDto=getOneTableDto(data)
        const table = await this._tableRepository.getTableById(tableDto.id)
        if (!table || table.hotelId.toString() !== tableDto.hotelId) {
            throw new AppError(TABLE_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        if (!table.isAvailable) {
            throw new AppError(TABLE_NOT_AVAILABLE, HttpStatus.NOT_FOUND)
        }
        const res= await this._tableRepository.getTableWithHotelDetails(tableDto.id)
        const dto=getTableWithHotelDetails(res!)
        return dto

    }
}