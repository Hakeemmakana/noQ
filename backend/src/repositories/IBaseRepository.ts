import { Model, UpdateQuery, HydratedDocument, QueryFilter, Query } from 'mongoose'
import { PaginatedResult } from '../types/pagination';



export class BaseRepository<T> {
    protected model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }
    async create(data: Partial<T>): Promise<HydratedDocument<T>> {
        return await this.model.create(data);
    }
    async getAll(filter: QueryFilter<T>): Promise<HydratedDocument<T>[]> {
        return await this.model.find(filter);
    }
    async getById(id: string): Promise<HydratedDocument<T> | null> {
        return await this.model.findOne({ _id: id, isDeleted: false })
    }
    async updateOneByFilter(
        filter: QueryFilter<T>,
        update: UpdateQuery<T>
    ): Promise<HydratedDocument<T> | null> {
        return await this.model.findOneAndUpdate(filter, update, { new: true })
    }
    async updateById(
        id: string,
        update: UpdateQuery<T>
    ): Promise<HydratedDocument<T> | null> {
        return await this.model.findByIdAndUpdate(id, update, { returnDocument: "after" })
    }
    async getByFilter(filter: QueryFilter<T>): Promise<HydratedDocument<T> | null> {
        return await this.model.findOne(filter)
    }
    async deleteById(id: string): Promise<HydratedDocument<T> | null> {
        return await this.model.findByIdAndUpdate(id, { isDeleted: true }, { returnDocument: "after" })
    }
    async deleteByFilter(filter: QueryFilter<T>): Promise<HydratedDocument<T> | null> {
        return await this.model.findOneAndUpdate(filter, { isDeleted: true }, { new: true })
    }
    async getPaginatedData(filter: QueryFilter<T>, page: number, limit: number): Promise<PaginatedResult<T>> {
        const skip = (page - 1) * limit
        const data = await this.model.find(filter).skip(skip).limit(limit)
        const total = await this.model.countDocuments(filter)
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }
    }
    getByIdWithPopulate(id: string): Query<T | null, T> {
        return this.model.findOne({ _id: id, isDeleted: false, })
    }
    getOneWithPopulate(filter: QueryFilter<T>): Query<T|null, T> {
        return this.model.findOne(filter)
    }
    hardDeleteByFilter(filter: QueryFilter<T>): Promise<T | null> {
        return this.model.findOneAndDelete(filter)
    }

}