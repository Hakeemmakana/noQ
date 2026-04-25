import  { Model,  UpdateQuery, HydratedDocument,QueryFilter} from 'mongoose'
export class BaseRepository<T> {
    protected model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }
    async create(data:Partial<T>):Promise<HydratedDocument<T>> {
        return await this.model.create(data);
    }
    async getAll(filter:QueryFilter<T>):Promise<HydratedDocument<T>[]>{
        return await this.model.find(filter);
    }
    async getById(id:string):Promise<HydratedDocument<T>|null>{
        return await this.model.findById(id,{isDeleted:false})
    }
    async updateOneByFilter(
        filter:QueryFilter<T>,
        update:UpdateQuery<T>
    ):Promise<HydratedDocument<T>|null>{
        return await this.model.findOneAndUpdate(filter,update,{new:true})
    }
    async updateById(
        id:string,
        update:UpdateQuery<HydratedDocument<T>>
    ):Promise<HydratedDocument<T>|null>{
        return await this.model.findByIdAndUpdate(id,update,{new:true})
    }
    async getByFilter(filter:QueryFilter<T>):Promise<HydratedDocument<T>|null>{
        return await this.model.findOne(filter)
    }
    async deleteById(id:string):Promise<HydratedDocument<T>|null>{
        return await this.model.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    }
    async deleteByFilter(filter:QueryFilter<T>):Promise<HydratedDocument<T>|null>{
        return await this.model.findOneAndUpdate(filter,{isDeleted:true},{new:true})
    }

}