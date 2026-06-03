import { Types } from "mongoose";
import { ICart } from "../../../models/cart";

export interface ICartRepository{
    createCart(userId:string,hotelId: string,itemId:Types.ObjectId):Promise<ICart|null>
    deleteCart(userId:string,hotelId: string):Promise<ICart|null>
    getCart(userId:string,hotelId: string):Promise<ICart|null>
    incrementItemQuantity(userId:string,hotelId: string,itemId:string):Promise<ICart|null>
    decrementItemQuantity(userId:string,hotelId: string,itemId:string):Promise<ICart|null>
    addItemToCart(userId:string,hotelId: string,itemId:string):Promise<ICart|null>
    removeItemFromCart(userId:string,hotelId: string,itemId:string):Promise<ICart|null>
    getCartWithProduct(userId:string,hotelId:string):Promise<ICart|null>

}