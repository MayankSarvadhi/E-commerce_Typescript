import { logger, LogLevels } from "../logger/logger";
import { ErrorType } from "../utils/ErrorType";
import { Response, Request, NextFunction } from "express";

function GenerateCustomError(err: any, statusCode: number, res: Response) {
    const ErrorObj = { statusCode, message: err.message };
    return res.status(statusCode).send(ErrorObj);
}

export function ErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    if (err.ErrorName === undefined) {

        switch (err instanceof Error) {
            case err.name === "SequelizeValidationError":
                logger(LogLevels.error, `${err.message}`);
                return GenerateCustomError(err.errors[0], 400, res);

            case err.name === "SequelizeUniqueConstraintError":
                logger(LogLevels.error, `${err.message}`);
                return GenerateCustomError(err.errors[0], 409, res);

            default:
                logger(LogLevels.error, `${err.message}`);
                GenerateCustomError(err, 500, res);
                break;
        }     
    } else {

        switch (err.ErrorName) {
            case ErrorType.Forbidden:
                logger(LogLevels.error, `${err.message}`);
                GenerateCustomError(err, 403, res);
                break;

            case ErrorType.conflict:
                logger(LogLevels.error, `${err.message}`);
                GenerateCustomError(err, 409, res);
                break;

            case ErrorType.invalid_request:
                logger(LogLevels.error, `${err.message}`);
                GenerateCustomError(err, 400, res);
                break;

            case ErrorType.not_found:
                logger(LogLevels.error, `${err.message}`);
                GenerateCustomError(err, 404, res);
                break;

            case ErrorType.unauthorized:
                logger(LogLevels.error, `${err.message}`);
                GenerateCustomError(err, 401, res);
                break;

            case ErrorType.validation_error:
                logger(LogLevels.error, `${err.message}`);
                GenerateCustomError(err, 400, res);
                break;

            default:
                logger(LogLevels.error, `${err.message}`);
                GenerateCustomError(err, 500, res);
                break;
        }
    }


}

