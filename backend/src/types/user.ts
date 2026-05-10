export interface IUser{
    name:string;
    isVerified:boolean;
    imageUrl?:string;
    age?:number;
    gender?:string;
    dob?:Date;
    password:string;
    phone:string;
    email:string;
    googleId:string;
    isAdmin:boolean;
    isDeleted:boolean

}