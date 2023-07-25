import { NextFunction, Request, Response } from "express";
export const asyncWrapper = (passFunction: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(passFunction(req, res, next)).catch(next);
}; 