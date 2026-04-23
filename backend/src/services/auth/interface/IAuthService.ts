export interface IAuthService{
    register(name:string,email:string,phone:string,passwrod:string):Promise<{message:string}>
}