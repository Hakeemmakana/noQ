import { QueryFilter, Types } from "mongoose";
import Cart, { ICart } from "../../../models/cart";
import { BaseRepository } from "../../IBaseRepository";
import { ICartRepository } from "../interface/ICartRepository";
import { CreateCartData,  } from "../../../dtos/cart/other.dto";
import { injectable } from "inversify";
@injectable()
export default class CartRepository extends BaseRepository<ICart> implements ICartRepository {
    constructor() {
        super(Cart)
    }
    async getCart( userId: string,hotelId: string): Promise<ICart | null> {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const userObjectId = new Types.ObjectId(userId);
        const filter: QueryFilter<ICart> = {
            hotelId: hotelObjectId,
            userId: userObjectId
        }
        return await this.getByFilter(filter)
    }

    async deleteCart( userId: string,hotelId: string): Promise<ICart | null> {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const userObjectId = new Types.ObjectId(userId);
        const filter: QueryFilter<ICart> = {
            hotelId: hotelObjectId,
            userId: userObjectId
        }
        return await this.hardDeleteByFilter(filter)
    }
    async createCart( userId: string,hotelId: string, itemId:Types.ObjectId): Promise<ICart | null> {
        const cartData: CreateCartData = {
            userId: new Types.ObjectId(userId),
            hotelId: new Types.ObjectId(hotelId),
            items:[{itemId:itemId,quantity:1}]
        };
        return await this.create(cartData)
    }
    async incrementItemQuantity( userId: string,hotelId: string, itemId: string): Promise<ICart | null> {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const userObjectId = new Types.ObjectId(userId);
        const itemObjectId = new Types.ObjectId(itemId);
        const filter: QueryFilter<ICart> = {
            hotelId: hotelObjectId,
            userId: userObjectId,
            'items.itemId': itemObjectId
        }
        const update = {
            $inc: {
                "items.$.quantity": 1
            }
        };
        return await this.updateOneByFilter(filter, update)
    }
    async decrementItemQuantity( userId: string,hotelId: string, itemId: string): Promise<ICart | null> {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const userObjectId = new Types.ObjectId(userId);
        const itemObjectId = new Types.ObjectId(itemId);
        const filter: QueryFilter<ICart> = {
            hotelId: hotelObjectId,
            userId: userObjectId,
            'items.itemId': itemObjectId
        }
        const update = {
            $inc: {
                "items.$.quantity": -1
            }
        };
        return await this.updateOneByFilter(filter, update)
    }
    async addItemToCart( userId: string,hotelId: string, itemId: string): Promise<ICart | null> {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const userObjectId = new Types.ObjectId(userId);
        const filter: QueryFilter<ICart> = {
            hotelId: hotelObjectId,
            userId: userObjectId
        }
        const cartPushQurey = {
            $push: {
                items: {
                    itemId: new Types.ObjectId(itemId),
                    quantity: 1,
                },
            },
        }
        return await this.updateOneByFilter(filter,cartPushQurey)
    }
    async removeItemFromCart( userId: string,hotelId: string, itemId: string): Promise<ICart | null> {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const userObjectId = new Types.ObjectId(userId);
        const filter: QueryFilter<ICart> = {
            hotelId: hotelObjectId,
            userId: userObjectId
        }
        const cartPullQuery = {
            $pull: {
                items: {
                    itemId: new Types.ObjectId(itemId),
                },
            },
        }
        return await this.updateOneByFilter(filter,cartPullQuery)
    }
    async getCartWithProduct(userId: string, hotelId: string): Promise<ICart|null> {
        const hotelObjectId = new Types.ObjectId(hotelId);
        const userObjectId = new Types.ObjectId(userId);
        const filter: QueryFilter<ICart> = {
            hotelId: hotelObjectId,
            userId: userObjectId
        }
        const res=await this.getOneWithPopulate(filter).populate('items.itemId')
        console.log(res,'in repo')
        return res
    
    }
}