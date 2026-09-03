import { inject, injectable } from "inversify";
import { ICart } from "../../../models/cart";
import ICartService from "../interface/ICartService";
import { ICartRepository } from "../../../repositories/cart/interface/ICartRepository";
import IMenuRepository from "../../../repositories/menu/interface/IMenuRespository";
import { TYPES } from "../../../DI/types";
import { AppError } from "../../../middleware/errorHandler";
import { CART_EMPTY, CART_ITEM_NOT_FOUND, CART_NOT_FOUND, PRODUCT_NOT_FOUND, PRODUCT_OUT_OF_STOCK, PRODUCT_STOCK_EXCEEDED } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import { CartwithProductDto, toCartWithProductDto } from "../../../dtos/cart/cart.response.dto";
import { getVariantAndProductId } from "../../../dtos/cart/cart.dto";
@injectable()
export default class CartService implements ICartService {
    constructor(@inject(TYPES.CartRepository) private _cartRepository: ICartRepository,
        @inject(TYPES.MenuItemRepository) private _menuRepository: IMenuRepository
    ) { }
    addToCart = async (userId: string, hotelId: string, itemId: string): Promise<ICart | null> => {
        const { productId, variantId } = getVariantAndProductId(itemId)
        const product = await this._menuRepository.getMenuItemById(productId)
        if (!product || product.hotelId.toString() !== hotelId) {
            throw new AppError(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const variant = product.variants.find(item => item._id?.toString() === variantId)
        if (!variant) {
        throw new AppError(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const quantityToAdd = (product.stockMode === 'SHARED') ? (variant.stockFactor ?? 1) : 1;

        if (product.stockMode == 'SHARED'  ) {
            if(product.stock <quantityToAdd){
                throw new AppError(PRODUCT_OUT_OF_STOCK, HttpStatus.BAD_REQUEST);
            }
        } else {
            if (!variant?.stock || variant?.stock <= 0) {
                throw new AppError(PRODUCT_OUT_OF_STOCK, HttpStatus.BAD_REQUEST);
            }
        }

        let cart = await this._cartRepository.getCart(userId, hotelId)
        if (!cart) {
            cart = await this._cartRepository.createCart(userId, hotelId,productId,variantId)
            return cart
        }
        
        

        const existingItem = cart.items.find((item) => item.variantId.toString() === variantId)
    
    ///shared product only for 
    const productInCartItems=cart.items.filter(item=>
                item.itemId.toString()==productId
            )
            const TotalStockRequired=productInCartItems.reduce((total:number,cartItem):number=>{
                const variant=product.variants.find(x=>x._id?.toString()===cartItem.variantId.toString())
                if(!variant)return total
                return total+cartItem.quantity*(variant?.stockFactor??1)
            },0)
            const nextQuantityShared=TotalStockRequired+quantityToAdd



        if (existingItem) {
            
            if (product.stockMode == 'SHARED' ) {
                if(product.stock<nextQuantityShared){
                    throw new AppError(PRODUCT_STOCK_EXCEEDED, HttpStatus.BAD_REQUEST)
                }
            } else {
                const nextQuantitySeperate=(existingItem.quantity)+quantityToAdd
                if (variant.stock && variant.stock <nextQuantitySeperate) {
                    throw new AppError(PRODUCT_STOCK_EXCEEDED, HttpStatus.BAD_REQUEST)

                }
            }
            return await this._cartRepository.incrementItemQuantity(userId, hotelId, productId,variantId)
        } else {
             if (product.stockMode == 'SHARED' ) {
                if(product.stock<nextQuantityShared){
                    throw new AppError(PRODUCT_STOCK_EXCEEDED, HttpStatus.BAD_REQUEST)
                }
            } 
            return await this._cartRepository.addItemToCart(userId, hotelId, productId,variantId)
        }

    }
    removeFromCart = async (userId: string, hotelId: string, itemId: string): Promise<ICart | null> => {
        const {  variantId } = getVariantAndProductId(itemId)
        const cart = await this._cartRepository.getCart(userId, hotelId)
        if (!cart) {
            throw new AppError(CART_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const item = cart.items.find((x) => x.variantId.toString() === variantId)
        if (!item) {
            throw new AppError(CART_ITEM_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (item.quantity > 1) {
            return await this._cartRepository.decrementItemQuantity(userId, hotelId, variantId)
        } else {
            return await this._cartRepository.removeItemFromCart(userId, hotelId, variantId)
        }
    }
    delteProductFromCart = async (userId: string, hotelId: string, itemId: string): Promise<ICart | null> => {
        const {  variantId } = getVariantAndProductId(itemId)
        const cart = await this._cartRepository.getCart(userId, hotelId)
        if (!cart) {
            throw new AppError(CART_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const item = cart.items.find((x) => x.variantId.toString() === variantId)
        if (!item) {
            throw new AppError(CART_ITEM_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        return await this._cartRepository.removeItemFromCart(userId, hotelId, variantId)

    }
    getCart = async (userId: string, hotelId: string): Promise<ICart | null> => {
        return await this._cartRepository.getCart(userId, hotelId)
    }
    getCartWithProduct = async (userId: string, hotelId: string): Promise<CartwithProductDto | null> => {
        const cart = await this._cartRepository.getCartWithProduct(userId, hotelId)
        if(!cart){
            throw new AppError(CART_EMPTY,HttpStatus.NOT_FOUND)
        }
        const cartDto: CartwithProductDto = toCartWithProductDto(cart!)
        return cartDto
    }
}