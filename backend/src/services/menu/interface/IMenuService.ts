import { IGetMenuItemDto, MenuItemInputDto, menuItemReqDto } from "../../../dtos/menuItems/menu-req-dto";
import { IPaginatedMenuItemData, menuItemResDto } from "../../../dtos/menuItems/menu-res.dto";
import { IMenuItem } from "../../../models/menuItem";

export default interface IMenuItemService {
    getAllMenuItems(data:IGetMenuItemDto , hotelId: string): Promise<IPaginatedMenuItemData<menuItemResDto>>;
    createMenuItem(data: menuItemReqDto,hotelId: string,  file: Express.Multer.File): Promise<IMenuItem>;
    statusChangeMenuItem(id: string, hotelId: string, status: "available" | "unavailable"): Promise<IMenuItem | null>;
    updateMenuItem(id: string, hotelId: string, data: menuItemReqDto, file?: Express.Multer.File|string): Promise<IMenuItem | null>;
    deleteMenuItem(id: string, hotelId: string): Promise<IMenuItem | null>;
    // getMenuItem(data: getOneMenuItem): Promise<IMenuItemwithHotelDetailsResponseDto>;
}