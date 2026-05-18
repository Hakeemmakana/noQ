import { QueryFilter, Types } from "mongoose";
import Category, { ICategory } from "../../../models/category";
import { PaginatedResult } from "../../../types/pagination";
import { BaseRepository } from "../../IBaseRepository";
type CreateCategoryData = Partial<ICategory> & {
  hotelId:Types.ObjectId
};

import ICategoryRepository from "../interfaces/ICategoryRepository";
import { injectable } from "inversify";
@injectable()
export default class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository{
    constructor(){
        super(Category)
    }
    async createCategory(data: Partial<ICategory>,hotelId:string): Promise<ICategory> {
        const hotelObjectId=new Types.ObjectId(hotelId)
        const categoryData:CreateCategoryData={
            ...data,
            isDeleted:false,
            hotelId:hotelObjectId
        }
        return await this.create(categoryData);
    }
    async getAllCategory(search: string, page: number, limit: number, hotelId: string): Promise<PaginatedResult<ICategory>> {
        const hotelObjectId=new Types.ObjectId(hotelId)
        const filter: QueryFilter<ICategory> = {
            isDeleted: false,
            hotelId: hotelObjectId
        }
        if (search) {
            filter.$or = [
                { name: { $regex: `^${search}`, $options: 'i' } },
            ]
        }
        return await this.getPaginatedData(filter, page, limit)
    }
    async getCategoryById(id: string): Promise<ICategory | null> {
        return await this.getById(id)
    }
    async updateCategory(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
        return await this.updateById(id, data)
    }
    async statusChangeCategory(id: string, status: string): Promise<ICategory | null> {
        const updateData = {
            isAvailable: status === 'active'
        }
        return await this.updateById(id, updateData)
    }
    async deleteCategory(id: string): Promise<ICategory | null> {
        return await this.deleteById(id);
    }
    async findByName(name: string, hotelId: string, excludeId?: string): Promise<ICategory | null> {
        const hotelObjectId=new Types.ObjectId(hotelId)
        const query:QueryFilter<ICategory>={
            name:{$regex:name,'$options':'i'},
            hotelId:hotelObjectId
        }
        if(excludeId){
            query._id={$ne:excludeId}
        }
        return await this.getByFilter(query)
    }
}