import { NextFunction, Request,Response } from "express";

export class AppError extends Error {
    public readonly statusCode:number;
    public readonly errors?:Record<string, string>;
    public readonly isOperational: boolean;;
    constructor(message: string, statusCode: number, errors?: Record<string, string>) {
        super(message)
        this.statusCode = statusCode;
        this.errors = errors;
        this.isOperational = true;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
export const errorHandler=(
    err:Error,
    req:Request,
    res:Response,
    _next:NextFunction
)=>{
    if (err instanceof AppError) {
        console.log(err)
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            errors: err.errors || null
        });
    }
    console.error('INTERNAL ERROR:', err);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
    
}