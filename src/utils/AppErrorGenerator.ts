class AppError extends Error {
    public ErrorName: any
    public message: string;
    constructor(message: string, ErrorName: any) {
        super(message)
        this.ErrorName = ErrorName;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;    