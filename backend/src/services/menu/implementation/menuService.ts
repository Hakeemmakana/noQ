import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";

import { IMenuItem } from "../../../models/menuItem";
import { AppError } from "../../../middleware/errorHandler";
import { MENU_ITEM_NAME_EXIST, MENU_ITEM_NOT_EXIST, MENU_ITEM_NOT_FOUND, VALIDATION_FAILED, VARIANT_NAME_EXIST, } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import IMenuItemService from "../interface/IMenuService";
import IMenuRepository from "../../../repositories/menu/interface/IMenuRespository";
import { covertMenuInputDto, getMenuItemDto, getMenuItemUserDto, IFilterMenuItem, IGetMenuItemDto, menuItemReqDto } from "../../../dtos/menuItems/menu-req-dto";
import { IPaginatedMenuItemData, menuItemResDto, toPaginatedMenuItemResponse } from "../../../dtos/menuItems/menu-res.dto";
import IMediaService from "../../mediaService/interface/IMediaService";
import IHotelAdminRepository from "../../../repositories/hotelAdmin/interface/IHotelAdminRepository";
import { IMenuItemwithVariantDetailsResponseDto, IResMenuDetailsDto, toMenuDetailsDto, toOneMenuWithVariant } from "../../../dtos/menuItems/menuVariant-res.dto";
import { IMenuVariantFormValues, toMenuVariantDto } from "../../../dtos/menuItems/mernuVariant-req.dto";
import { validateMenuVariantFormInService } from "../../../validation/menuVariantValidation";

@injectable()
export default class MenuItemService implements IMenuItemService {
    constructor(@inject(TYPES.MenuItemRepository) private _menuItemRepository: IMenuRepository,
        @inject(TYPES.MediaService) private _mediaService: IMediaService,
        @inject(TYPES.HotelAdminRepository) private _hotelAdminRepository: IHotelAdminRepository) { }

    createMenuItem = async (data: menuItemReqDto, hotelId: string, file: Express.Multer.File): Promise<IMenuItem> => {
        const dto = covertMenuInputDto(data)
        if (dto.itemName) {
            const existMenuItem = await this._menuItemRepository.findByName(dto.itemName, hotelId)
            if (existMenuItem) {
                throw new AppError(MENU_ITEM_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        if (file) {
            const url = await this._mediaService.upload(file)
            dto.itemImage = url

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

    updateMenuItem = async (id: string, hotelId: string, data: menuItemReqDto, file: string | Express.Multer.File): Promise<IMenuItem | null> => {
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
        if (file && file !== menuItemIsExist.itemImage && typeof file !== 'string') {
            const url = await this._mediaService.upload(file)
            await this._mediaService.delete(menuItemIsExist.itemImage)
            dto.itemImage = url
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
   getAllUserMenuItems = async (filter: IFilterMenuItem, hotelId: string, page: number): Promise<IPaginatedMenuItemData<menuItemResDto>> => {
        const dto = getMenuItemUserDto(filter)
        const limit = 8
        const menuItem = await this._menuItemRepository.getAllUserMenuItems(dto, limit, hotelId!, page)
        const outDto = toPaginatedMenuItemResponse(menuItem)
        return outDto
    }

    getMenuItem = async (menuItemId: string, hotelId: string): Promise<IMenuItemwithVariantDetailsResponseDto> => {
        const menuItem = await this._menuItemRepository.getMenuItemById(menuItemId)
        if (!menuItem || menuItem.hotelId.toString() !== hotelId) {
            throw new AppError(MENU_ITEM_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        if (!menuItem.isAvailable) {
            throw new AppError(MENU_ITEM_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        // const res = await this._menuItemRepository.getMenuItemWithHotelDetails(menuItemDto.id)
        const dto = toOneMenuWithVariant(menuItem!)
        return dto
    }
    menuVariantAdd = async (hotelId: string, productId: string, data: IMenuVariantFormValues, file: Express.Multer.File): Promise<IMenuItem | null> => {
        const menuVariantDto = toMenuVariantDto(data)
        const menuItem = await this._menuItemRepository.getMenuItemById(productId)
        if (!menuItem || menuItem.hotelId.toString() !== hotelId) {
            throw new AppError(MENU_ITEM_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        const validation = validateMenuVariantFormInService(menuVariantDto, menuItem.stockMode)
        if (!validation.isValid) {
            throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, validation.errors)
        }
        if (file) {
            const url = await this._mediaService.upload(file)
            menuVariantDto.image = url

        }
        const res = this._menuItemRepository.menuVariantAdd(productId, menuVariantDto);
        return res
    }
    menuVariantEdit = async (hotelId: string, productId: string, variantId: string, data: IMenuVariantFormValues, file: string | Express.Multer.File): Promise<IMenuItem | null> => {
        const menuVariantDto = toMenuVariantDto(data)
        const menuItem = await this._menuItemRepository.getMenuItemById(productId)

        if (!menuItem || menuItem.hotelId.toString() !== hotelId) {
            throw new AppError(MENU_ITEM_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        const variantNameExist = menuItem.variants.find(item => item?.name == menuVariantDto.name &&
            item?._id?.toString() !== variantId
        )
        if (variantNameExist) {
            throw new AppError(VARIANT_NAME_EXIST, HttpStatus.CONFLICT)
        }
        const imageObj = menuItem.variants.find(item => item._id?.toString() === variantId)
        if (file && typeof file !== 'string'&&imageObj?.image) {
            const url = await this._mediaService.upload(file)
            await this._mediaService.delete(imageObj?.image)
            menuVariantDto.image = url
        }
        const res = await this._menuItemRepository.menuVariantEdit(productId, variantId, menuVariantDto)
        return res
    }
    menuVariantDelete = async (hotelId: string, productId: string, variantId: string): Promise<IMenuItem | null> => {
        const menuItem = await this._menuItemRepository.getMenuItemById(productId)
        const variantExist=menuItem?.variants.find(item=>item._id?.toString()===variantId)
        if (!menuItem || menuItem.hotelId.toString() !== hotelId||!variantExist) {
            throw new AppError(MENU_ITEM_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        const res= await this._menuItemRepository.menuVariantDelete(productId,variantId)
        return res
    }
    getMenuDetails = async (menuItemId: string, hotelId: string): Promise<IResMenuDetailsDto> => {
        const menuItem = await this._menuItemRepository.getMenuItemById(menuItemId)
        if (!menuItem || menuItem.hotelId.toString() !== hotelId) {
            throw new AppError(MENU_ITEM_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        if (!menuItem.isAvailable) {
            throw new AppError(MENU_ITEM_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        // const res = await this._menuItemRepository.getMenuItemWithHotelDetails(menuItemDto.id)
        const dto = toMenuDetailsDto(menuItem!)
        return dto
    }


}