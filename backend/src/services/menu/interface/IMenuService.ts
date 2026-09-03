import { IFilterMenuItem, IGetMenuItemDto, menuItemReqDto } from "../../../dtos/menuItems/menu-req-dto";
import { IPaginatedMenuItemData, menuItemResDto } from "../../../dtos/menuItems/menu-res.dto";
import { IMenuItemwithVariantDetailsResponseDto, IResMenuDetailsDto } from "../../../dtos/menuItems/menuVariant-res.dto";
import { IMenuVariantFormValues } from "../../../dtos/menuItems/mernuVariant-req.dto";
import { IMenuItem } from "../../../models/menuItem";

export default interface IMenuItemService {
    getAllMenuItems(data: IGetMenuItemDto, hotelId: string): Promise<IPaginatedMenuItemData<menuItemResDto>>;
    createMenuItem(data: menuItemReqDto, hotelId: string, file: Express.Multer.File): Promise<IMenuItem>;
    statusChangeMenuItem(id: string, hotelId: string, status: "available" | "unavailable"): Promise<IMenuItem | null>;
    updateMenuItem(id: string, hotelId: string, data: menuItemReqDto, file?: Express.Multer.File | string): Promise<IMenuItem | null>;
    deleteMenuItem(id: string, hotelId: string): Promise<IMenuItem | null>;
    getAllUserMenuItems(filter: IFilterMenuItem, hotelId: string, page: number): Promise<IPaginatedMenuItemData<menuItemResDto>>
    getMenuItem(menuItemId: string, hotelId: string): Promise<IMenuItemwithVariantDetailsResponseDto>;
    menuVariantAdd(hotelId: string, productId: string, data:IMenuVariantFormValues,file:Express.Multer.File): Promise<IMenuItem | null>;
    menuVariantEdit(hotelId: string, productId: string, variantId: string,data:IMenuVariantFormValues,file:string| Express.Multer.File): Promise<IMenuItem | null>;
    menuVariantDelete(hotelId: string, productId: string, variantId: string): Promise<IMenuItem | null>;
    getMenuDetails(menuItemId: string, hotelId: string): Promise<IResMenuDetailsDto>
}