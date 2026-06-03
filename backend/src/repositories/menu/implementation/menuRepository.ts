import MenuItem, { IMenuItem } from "../../../models/menuItem";
import { PaginatedResult } from "../../../types/pagination";
import { BaseRepository } from "../../IBaseRepository";
import { QueryFilter, Types } from 'mongoose'
import IMenuRepository from "../interface/IMenuRespository";
import { IFilterMenuItem, MenuItemInputDto } from "../../../dtos/menuItems/menu-req-dto";

type CreateMenuItemData = Partial<IMenuItem> & {
    hotelId: Types.ObjectId;
    category: Types.ObjectId
};

export default class MenuItemRepository extends BaseRepository<IMenuItem> implements IMenuRepository {
    constructor() {
        super(MenuItem);
    }

    async createMenuItem(data: MenuItemInputDto, hotelId: string): Promise<IMenuItem> {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const categoryObjectId = new Types.ObjectId(data.category)
        const menuItemData: CreateMenuItemData = {
            ...data,
            category: categoryObjectId,
            isDeleted: false,
            hotelId: hotelObjectId
        };
        return await this.create(menuItemData);
    }

    async getAllMenuItems(search: string, page: number, limit: number, hotelId: string): Promise<PaginatedResult<IMenuItem>> {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const filter: QueryFilter<IMenuItem> = {
            isDeleted: false,
            hotelId: hotelObjectId
        };

        if (search) {
            filter.$or = [
                { itemName: { $regex: `^${search}`, $options: 'i' } },
            ];
        }

        return await this.getPaginatedData(filter, page, limit);
    }

    async getMenuItemById(id: string): Promise<IMenuItem | null> {
        return await this.getById(id);
    }

    async updateMenuItem(id: string, data: MenuItemInputDto): Promise<IMenuItem | null> {
        return await this.updateById(id, data);
    }

    async statusChangeMenuItem(id: string, status: string): Promise<IMenuItem | null> {
        const updateData = {
            status: status
        };
        return await this.updateById(id, updateData);
    }

    async deleteMenuItem(id: string): Promise<IMenuItem | null> {
        return await this.deleteById(id);
    }

    async findByName(name: string, hotelId: string, excludeId?: string): Promise<IMenuItem | null> {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const query: QueryFilter<IMenuItem> = {
            itemName: { $regex: name, $options: 'i' },
            hotelId: hotelObjectId
        };

        if (excludeId) {
            query._id = { $ne: excludeId };
        }

        return await this.getByFilter(query);
    }
    async getAllUserMenuItems(data: IFilterMenuItem, limit: number, hotelId:string, page: number) {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const filter: QueryFilter<IMenuItem> = {
            isDeleted: false,
            hotelId:hotelObjectId,
            isAvailable: true,

        };

        if (data.search) {
            filter.$or = [
                { itemName: { $regex: `^${data.search}`, $options: 'i' } },
            ];
        }
        if(data.category){
            filter.category=data.category
        }
        if (data.price) {
            filter.price = {
                $lte: data.price
            };
        }
        if(data.type){
            filter.type=data.type
        }
        return await this.getPaginatedData(filter, page, limit);

    }

}