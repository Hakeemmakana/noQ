import { User } from "../../../models/user";
import { BaseRepository } from "../../IBaseRepository";


export class AuthRepository extends BaseRepository{
    constructor(){
        super(User)
    }


}