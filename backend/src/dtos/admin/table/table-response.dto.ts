
import { IHotelAdmin } from "../../../models/hotelAdmin";
import { ITable, } from "../../../models/table";


export interface ITableResponseDto {
    id: string;
    number: string;
    capacity: number;
    status: 'active' | 'inactive'
}
export interface IPaginatedTableData<T> {
    total: number;
    page: number;
    limit: number;
    hotelId?: string;
    data: T[]
}

function formatTableResponse(data: ITable): ITableResponseDto {
    return {
        id: data._id?.toString() ?? '',
        number: data.tableNumber,
        capacity: data.seatingCapacity,
        status: data.isAvailable ? 'active' : 'inactive'
    };
}
export function toPaginatedTableResponse(paginatedData: IPaginatedTableData<ITable>): IPaginatedTableData<ITableResponseDto> {
    return {
        total: paginatedData.total || 0,
        page: paginatedData.page || 1,
        limit: paginatedData.limit || 8,
        hotelId: paginatedData.data[0]?.hotelId.toString() ?? '',
        data: (paginatedData.data || []).map(formatTableResponse)
    };
}
export interface ITableWithHotelDetails extends Omit<ITable, 'hotelId'> {
    hotelId: IHotelAdmin
}
export interface ITablewithHotelDetailsResponseDto {
    hotelName: string;
    hotelSlug:string;
    tableNumber:string;
    hotelImage:string;
    tableId:string
}
export function getTableWithHotelDetails(data:ITable): ITablewithHotelDetailsResponseDto {
    const hotel=data.hotelId as IHotelAdmin
    return {
        hotelName: hotel.restaurantName,
        hotelSlug: hotel.slug,
        tableNumber: data.tableNumber,
        hotelImage: hotel.imageUrl??'',
        tableId:data?._id?.toString()??''
    }
}