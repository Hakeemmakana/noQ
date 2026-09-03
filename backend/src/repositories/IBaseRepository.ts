import { Model, UpdateQuery, HydratedDocument, QueryFilter, Query, PopulateOptions } from 'mongoose'
import { PaginatedResult } from '../types/pagination';



export class BaseRepository<T> {
    protected model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }
    async create(data: Partial<T>): Promise<HydratedDocument<T>> {
        return await this.model.create(data);
    }
    async createMany(data: Partial<T>[]): Promise<HydratedDocument<T>[]> {
        return await this.model.create(data);
    }

    async getAll(filter: QueryFilter<T>, populate?: string[]|PopulateOptions | PopulateOptions[], page?: number,
        limit?: number, sort?: { createdAt: 1 | -1; _id: 1 | -1 }): Promise<HydratedDocument<T>[]> {
        let query = this.model.find(filter);
        if (populate) {
            query = query.populate(populate)
        }
        if (page !== undefined && limit !== undefined) {
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);
        }
        if (sort) {
            query = query.sort(sort);
        } else {
            query = query.sort({
                createdAt: -1,
                _id: -1,
            });
        }
        return await query
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
    async getPaginatedData(filter: QueryFilter<T>, page: number, limit: number,): Promise<PaginatedResult<T>> {
        const skip = (page - 1) * limit
        const data = await this.model.find(filter).sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit)
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
    getOneWithPopulate(filter: QueryFilter<T>): Query<T | null, T> {
        return this.model.findOne(filter)
    }
    // getByFilterwithPopulate(filter:QueryFilter<T>):Query<T|null,T>{
    //     return this.model.findOne(filter)
    // }
    hardDeleteByFilter(filter: QueryFilter<T>): Promise<T | null> {
        return this.model.findOneAndDelete(filter)
    }

}