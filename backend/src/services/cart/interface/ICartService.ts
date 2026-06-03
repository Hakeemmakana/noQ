import { CartwithProductDto } from "../../../dtos/admin/category/category-response.dto";
import { ICart } from "../../../models/cart";

export default interface ICartService{
    addToCart(userId:string,hotelId:string,itemId:string):Promise<ICart|null>
    removeFromCart(userId:string,hotelId:string,itemId:string):Promise<ICart|null>
    delteProductFromCart(userId:string,hotelId:string,itemId:string):Promise<ICart|null>
    getCart(userId:string,hotelId:string):Promise<ICart|null>
    getCartWithProduct(userId:string,hotelId:string):Promise<CartwithProductDto|null>

}