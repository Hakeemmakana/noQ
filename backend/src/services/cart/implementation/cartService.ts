import { inject, injectable } from "inversify";
import { ICart } from "../../../models/cart";
import ICartService from "../interface/ICartService";
import { ICartRepository } from "../../../repositories/cart/interface/ICartRepository";
import IMenuRepository from "../../../repositories/menu/interface/IMenuRespository";
import { TYPES } from "../../../DI/types";
import { AppError } from "../../../middleware/errorHandler";
import { CART_ITEM_NOT_FOUND, CART_NOT_FOUND, PRODUCT_NOT_FOUND, PRODUCT_OUT_OF_STOCK, PRODUCT_STOCK_EXCEEDED } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import { CartwithProductDto,  toCartWithProductDto } from "../../../dtos/admin/category/category-response.dto";
@injectable()
export default class CartService implements ICartService{
    constructor(@inject(TYPES.CartRepository) private _cartRepository:ICartRepository,
            @inject(TYPES.MenuItemRepository) private _menuRepository:IMenuRepository
    ){}
addToCart=async(userId: string, hotelId: string, itemId: string): Promise<ICart | null>=> {
    const product=await this._menuRepository.getMenuItemById(itemId)
    if(!product||product.hotelId.toString()!==hotelId){
        throw new AppError(PRODUCT_NOT_FOUND,HttpStatus.NOT_FOUND)
    }

    if(product.type=='quick'&&product.stock<=0){
         throw new AppError(PRODUCT_OUT_OF_STOCK, HttpStatus.BAD_REQUEST);
    }
    let cart=await this._cartRepository.getCart(userId,hotelId)
    if(!cart){
        cart=await this._cartRepository.createCart(userId,hotelId,product._id!)
        return cart
    }
    const existingItem=cart.items.find((item)=>item.itemId.toString()===itemId)
    if(existingItem){
        if(product.type=='quick'&&product.stock<=existingItem.quantity){
            throw new AppError(PRODUCT_STOCK_EXCEEDED,HttpStatus.BAD_REQUEST)
        }
        return await this._cartRepository.incrementItemQuantity(userId,hotelId,itemId)
    }else{
        return await this._cartRepository.addItemToCart(userId,hotelId,itemId)
    }

}
removeFromCart=async(userId: string, hotelId: string, itemId: string): Promise<ICart | null>=> {
    const cart =await this._cartRepository.getCart(userId,hotelId)
    if(!cart){
        throw new AppError(CART_NOT_FOUND,HttpStatus.NOT_FOUND)
    }
    const item=cart.items.find((x)=>x.itemId.toString()===itemId)
    if(!item){
        throw new AppError(CART_ITEM_NOT_FOUND,HttpStatus.NOT_FOUND)
    }
    if(item.quantity>1){
        return await this._cartRepository.decrementItemQuantity(userId,hotelId,itemId)
    }else{
        return await this._cartRepository.removeItemFromCart(userId,hotelId,itemId)
    }
}
delteProductFromCart=async(userId: string, hotelId: string, itemId: string): Promise<ICart | null>=> {
    const cart =await this._cartRepository.getCart(userId,hotelId)
    if(!cart){
        throw new AppError(CART_NOT_FOUND,HttpStatus.NOT_FOUND)
    }
    const item=cart.items.find((x)=>x.itemId.toString()===itemId)
    if(!item){
        throw new AppError(CART_ITEM_NOT_FOUND,HttpStatus.NOT_FOUND)
    }
    
        return await this._cartRepository.removeItemFromCart(userId,hotelId,itemId)
    
}
getCart=async(userId: string, hotelId: string): Promise<ICart|null>=> {
    return await this._cartRepository.getCart(userId,hotelId)
}
getCartWithProduct=async(userId: string, hotelId: string): Promise<CartwithProductDto|null>=> {
    const cart=await this._cartRepository.getCartWithProduct(userId,hotelId)
    const cartDto:CartwithProductDto=toCartWithProductDto(cart!)
    return cartDto
}
}