import express, { Express } from "express";
import { asyncWrapper, uploadsFile } from "../middleware/index";
import { ProductControllers } from "../controller/index";
import passport from "passport";
export const ProductRoutes = express.Router();

ProductRoutes.post
    ("/", passport.authenticate('jwt', { session: false }),
        asyncWrapper(ProductControllers.createProduct));

// ProductRoutes.delete
//     ("/:id", passport.authenticate('jwt', { session: false }),
//         asyncWrapper(ProductControllers.deleteWithImg));