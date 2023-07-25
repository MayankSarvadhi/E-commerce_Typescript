import AppError from "../utils/AppErrorGenerator";
import { db } from "../models/index";
import { ApplicationController } from "./Application.controller";
import fs from "fs";

class ProductController extends ApplicationController {

    constructor() {
        super(db.ProductSchema);
    }
    async createProduct(req, res, next) {
        req.body.userID = req.user.id;
        if (req.body.rool === "seller") {
            const Data = await db.ProductSchema.create(req.body);
            return res.status(201).json({ success: true, StatusCode: 201, data: Data, message: "Data Insert Successfully" });
        } else {
            throw new AppError('Buyer is Not Authorized for Create Product', 'unauthorized');
        }
    }

    async deleteWithImg(req, res, next) {
        const { id } = req.params;

        const deleted = await db.ProductSchema.destroy({ where: { id } });
        const findImage = await db.ProductSchema.findByPk(id);

        if (findImage.image !== "placeholder.jpeg") {
            fs.unlinkSync(findImage.image);


        }
        if (deleted) {
            return res.json({ success: true, statusCode: 200, data: deleted, message: 'Data deleted Successfully With Image' });
        } else {
            return next(new AppError(`id = ${id}  not found/Match`, `not_found`));
        }
    }

}
export const ProductControllers = new ProductController();

