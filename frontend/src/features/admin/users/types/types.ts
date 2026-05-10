
export type UserStatus = "active" | "blocked";

export type User = {
  _id: string;
  name: string;
  email: string;
  status: UserStatus;
  isVerified:boolean
  imageUrl?:string
};

export interface userResType{
 data:User[];
limit:number;
page:number;
total:number
totalPages:number;
}