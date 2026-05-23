import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import HttpStatus from '../constants/httpStatusCode'
import { AuthRepository } from '../repositories/auth/implementation/authRepository'
import { ACCOUNT_IS_BLOCKED } from '../constants/messages'
import { AppError } from './errorHandler'
import AdminAuthRepository from '../repositories/adminAuth/implemetation/adminAuthRepository'

const userRepo = new AuthRepository()
const adminRepo= new AdminAuthRepository()
type JwtPayloadType = {
    id: string;
    role: string;
};
type JwtPayloadWithUser = {
    userId: string;
};

export interface AuthRequest extends Request {
    user?: JwtPayloadType;
    admin?:JwtPayloadType
}

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

const generateAccessToken = (id: string, role: string): string => {
    return jwt.sign({ id, role }, JWT_ACCESS_SECRET as string, { expiresIn: '2h' })
}
const generateRefreshToken = (id: string, role: string,): string => {
    return jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' })
}

const verifyUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No Tocken Provided' })
            return
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No Tocken Provided' })
        }
        const decode = jwt.verify(token, JWT_ACCESS_SECRET as string) as JwtPayloadType
        const user = await userRepo.getById(decode.id)
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'user Not provided' })
        }
        if (!user.isVerified) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: ACCOUNT_IS_BLOCKED })
        }
        req.user = decode
        next()

    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(HttpStatus.UNAUTHORIZED || 401).json({ message: "Invalid or expired token" });

    }
}
const verifyAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No Tocken Provided' })
            return
        }
        const token = authHeader.split(' ')[1]
        console.log(token)
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No Token Provided' })
        }
        const decode = jwt.verify(token, JWT_ACCESS_SECRET as string) as JwtPayloadType
        if (decode.role !== 'admin') {
            return res.status(HttpStatus.FORBIDDEN).json({
                message: 'Access denied. Admin privileges required.'
            });
        }
        console.log('decode,',decode)
        const admin = await adminRepo.getById(decode.id)
        if (!admin) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'user Not provided' })
        }
        if (admin.status==='rejected') {
            return res.status(HttpStatus.FORBIDDEN).json({ message: ACCOUNT_IS_BLOCKED })
        }
        req.admin = decode
        next()

    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(HttpStatus.UNAUTHORIZED || 401).json({ message: "Invalid or expired token" });

    }
}

const verifyRefreshToken =  (refreshToken: string):JwtPayloadType | null => {
    try {
        const decode =  jwt.verify(refreshToken, JWT_REFRESH_SECRET as string)as JwtPayloadType;
        return decode;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}

const generateResetToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        process.env.JWT_RESET_SECRET as string,
        { expiresIn: '15m' }
    );
};
const verifyResetToken = (resetToken: string) => {
    try {
        const decode = jwt.verify(resetToken, process.env.JWT_RESET_SECRET as string) as JwtPayloadWithUser;
        return decode
    } catch (error) {
        console.log(error)
        throw new AppError("Invalid or expired token", HttpStatus.UNAUTHORIZED)

    }

}


export { generateAccessToken, generateRefreshToken, verifyAdmin,verifyUser, verifyRefreshToken, generateResetToken, verifyResetToken }