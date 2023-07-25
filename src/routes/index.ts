import express, { Express, Request, Response, NextFunction } from "express";
export const routes = express.Router();
import { asyncWrapper } from "../middleware/index";
import { END_POINTS } from "../constant/apiEndpoints";
import AppError from "../utils/AppErrorGenerator";
import { UserRoutes } from "./User.routes";
import { AuthRoutes } from "./Auth.Routes";
import { ProductRoutes } from "./Product.Routes";


routes.use(END_POINTS.USER, UserRoutes);
routes.use(END_POINTS.AUTH, AuthRoutes);
routes.use(END_POINTS.PRODUCTS, ProductRoutes);


const invalidedRouter = asyncWrapper((req: Request, res: Response, next: NextFunction) => {
    return next(new AppError(`${req.url} - Bad Request URL/Page not Found`, 'not_found'));
});
routes.all("*", invalidedRouter);
