import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";

import { IMenuItem } from "../../../models/menuItem";
import { AppError } from "../../../middleware/errorHandler";
import { MENU_ITEM_NAME_EXIST, MENU_ITEM_NOT_EXIST, } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import IMenuItemService from "../interface/IMenuService";
import IMenuRepository from "../../../repositories/menu/interface/IMenuRespository";
import { covertMenuInputDto, getMenuItemDto, getMenuItemUserDto, IFilterMenuItem, IGetMenuItemDto, menuItemReqDto } from "../../../dtos/menuItems/menu-req-dto";
import { IPaginatedMenuItemData, menuItemResDto, toPaginatedMenuItemResponse } from "../../../dtos/menuItems/menu-res.dto";
import IMediaService from "../../mediaService/interface/IMediaService";
import IHotelAdminRepository from "../../../repositories/hotelAdmin/interface/IHotelAdminRepository";

@injectable()
export default class MenuItemService implements IMenuItemService {
    constructor(@inject(TYPES.MenuItemRepository) private _menuItemRepository: IMenuRepository,
                @inject(TYPES.MediaService) private _mediaService:IMediaService,
                @inject(TYPES.HotelAdminRepository) private _hotelAdminRepository:IHotelAdminRepository) { }

    createMenuItem = async (data: menuItemReqDto, hotelId: string,file: Express.Multer.File): Promise<IMenuItem> => {
        const dto = covertMenuInputDto(data)
        if (dto.itemName) {
            const existMenuItem = await this._menuItemRepository.findByName(dto.itemName, hotelId)
            if (existMenuItem) {
                throw new AppError(MENU_ITEM_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        if(file){
           const url = await this._mediaService.upload(file)
           dto.itemImage=url

        }
        return await this._menuItemRepository.createMenuItem(dto, hotelId)
    }

    getAllMenuItems = async (data: IGetMenuItemDto, hotelId: string): Promise<IPaginatedMenuItemData<menuItemResDto>> => {
        const dto = getMenuItemDto(data)
        const limit = 8
        const menuItem = await this._menuItemRepository.getAllMenuItems(dto.searchVal, dto.page, limit, hotelId)
        const outDto = toPaginatedMenuItemResponse(menuItem)
        return outDto
    }

    updateMenuItem = async (id: string, hotelId: string, data: menuItemReqDto,file:string| Express.Multer.File): Promise<IMenuItem | null> => {
        const dto = covertMenuInputDto(data)
        if (dto.itemName) {
            const existMenuItemName = await this._menuItemRepository.findByName(dto.itemName, hotelId, id)
            if (existMenuItemName) {
                throw new AppError(MENU_ITEM_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        const menuItemIsExist = await this._menuItemRepository.getMenuItemById(id)
        if (!menuItemIsExist || menuItemIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(MENU_ITEM_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        if(file &&file!==menuItemIsExist.itemImage&&typeof file!=='string'){
           const url = await this._mediaService.upload(file)
           await this._mediaService.delete(menuItemIsExist.itemImage)
           dto.itemImage=url
        }
        return await this._menuItemRepository.updateMenuItem(id, dto,)
    }

    statusChangeMenuItem = async (id: string, hotelId: string, status: "available" | "unavailable"): Promise<IMenuItem | null> => {
        const menuItemIsExist = await this._menuItemRepository.getMenuItemById(id)
        if (!menuItemIsExist || menuItemIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(MENU_ITEM_NOT_EXIST, HttpStatus.NOT_FOUND)
        }

        return await this._menuItemRepository.statusChangeMenuItem(id, status)
    }

    deleteMenuItem = async (id: string, hotelId: string): Promise<IMenuItem | null> => {
        const menuItemIsExist = await this._menuItemRepository.getMenuItemById(id)
        if (!menuItemIsExist || menuItemIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(MENU_ITEM_NOT_EXIST, HttpStatus.NOT_FOUND)
        }

        return await this._menuItemRepository.deleteMenuItem(id)
    }
    getAllUserMenuItems=async(filter: IFilterMenuItem,hotelId:string,page:number): Promise<IPaginatedMenuItemData<menuItemResDto>>=> {
         const dto = getMenuItemUserDto(filter)
        const limit = 8
        const menuItem = await this._menuItemRepository.getAllUserMenuItems(dto,limit,hotelId!,page)
        const outDto = toPaginatedMenuItemResponse(menuItem)
        return outDto
    }

    // getMenuItem = async (data: getOneMenuItem): Promise<IMenuItemwithHotelDetailsResponseDto> => {
    //     const menuItemDto = getOneMenuItemDto(data)
    //     const menuItem = await this._menuItemRepository.getMenuItemById(menuItemDto.id)
    //     if (!menuItem || menuItem.hotelId.toString() !== menuItemDto.hotelId) {
    //         throw new AppError(MENU_ITEM_NOT_EXIST, HttpStatus.NOT_FOUND)
    //     }
    //     if (!menuItem.isAvailable) {
    //         throw new AppError(MENU_ITEM_NOT_FOUND, HttpStatus.NOT_FOUND)
    //     }
    //     const res = await this._menuItemRepository.getMenuItemWithHotelDetails(menuItemDto.id)
    //     const dto = getMenuItemWithHotelDetails(res!)
    //     return dto
    // }
}