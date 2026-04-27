import jwt from 'jsonwebtoken'



const generateToken=(id:string,role:string):string=>{
    return jwt.sign({id,role},process.env.JWT_ACCESS_SECRET as string,{expiresIn:'2h'})
}
const generateRefreshTocken=(id:string,role:string,):string=>{
    return jwt.sign({id,role},process.env.JWT_REFRESH_SECRET as string,{expiresIn:'7d'})
} 
