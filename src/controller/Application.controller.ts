import AppError from "../utils/AppErrorGenerator";
import { Request, Response, NextFunction } from "express"
import path from "path";
import fs from "fs"

export class ApplicationController {
    model: any;
    constructor(model: any) {
        this.model = model;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const Data = await this.model.create(req.body);
        res.status(201).json({ success: true, StatusCode: 201, data: Data, message: "Data Insert Successfully" });
    }

    async update(req: Request, res: Response, next: NextFunction) {

        const ImagePath = path.join('uploads', `${req.file.filename}`)
        const { id } = req.params; ``
        if (req.file) {
            const oldImageFind = await this.model.findByPk(id);
            if (oldImageFind.image !== "uploads/placeholder.jpeg") {
                fs.unlinkSync(oldImageFind.image)
            }
            const [updated] = await this.model.update(Object.assign({ ImagePath }, req.body), { where: { id } });
            if (updated) {

                const updatedData = await this.model.findByPk(id);
                return res.json({ success: true, StatusCode: 200, data: updatedData, message: "Data Update Successfully" });
            } else {
                return next(new AppError(`This id = ${id} not found`, 'not_found'));
            }
        } else {

            const [updated] = await this.model.update(req.body, { where: { id } });
            if (updated) {
                const updatedData = await this.model.findByPk(id);
                return res.json({ success: true, StatusCode: 200, data: updatedData, message: "Data Update Successfully" });
            } else {
                return next(new AppError(`This id = ${id} not found`, 'not_found'));
            }
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const deleted = await this.model.destroy({ where: { id } });
        if (deleted) {
            return res.json({ success: true, statusCode: 200, data: deleted, message: 'Data deleted Successfully' });
        } else {
            return next(new AppError(`id = ${id}  not found/Match`, `not_found`));
        }
    }
}