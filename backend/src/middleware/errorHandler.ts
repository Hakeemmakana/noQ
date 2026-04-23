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