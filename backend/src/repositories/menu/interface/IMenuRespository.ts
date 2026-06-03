import { IFilterMenuItem, MenuItemInputDto } from "../../../dtos/menuItems/menu-req-dto";
import { IMenuItem } from "../../../models/menuItem";
import { PaginatedResult } from "../../../types/pagination";

export default interface IMenuRepository {
    createMenuItem(data: MenuItemInputDto, hotelId: string): Promise<IMenuItem>;
    getAllMenuItems(search: string, page: number, limit: number, hotelId: string): Promise<PaginatedResult<IMenuItem>>;
    getMenuItemById(id: string): Promise<IMenuItem | null>;
    updateMenuItem(id: string, data: MenuItemInputDto): Promise<IMenuItem | null>;
    statusChangeMenuItem(id: string, status: string): Promise<IMenuItem | null>;
    deleteMenuItem(id: string): Promise<IMenuItem | null>;
    findByName(name: string, hotelId: string, excludeId?: string): Promise<IMenuItem | null>;
    getAllUserMenuItems(filter:IFilterMenuItem,limit:number,hotelId:string,page:number):Promise<PaginatedResult<IMenuItem>>;
}