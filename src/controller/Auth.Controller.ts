import { db } from "../models/index"
import dotenv from "dotenv"
dotenv.config();
import * as jwt from "jsonwebtoken"
import { ApplicationController } from "./Application.controller";
import AppError from "../utils/AppErrorGenerator";

class AuthController extends ApplicationController {

    constructor() {
        super(db.AuthSchema);
    }

    async login(req, res, next) {
        const { body: { email, password } } = req;
        const result = await db.UsersSchema.findOne({ where: { email } });
        if (result && result.authenticate(password)) {
            const payload = {
                id: result.id,
                email: result.email
            };
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXP, algorithm: "HS256" }
            );
            const [rowsAffected] = await db.AuthSchema.update(
                { token },
                { where: { userID: result.id } }
            );
            if (rowsAffected === 0) {
                await db.AuthSchema.create({ token, userID: payload.id });
            }
            return res.status(200).json({
                success: true,
                data: token,
                message: 'Congrats! You have Successfully logged in'
            });
        } else {
            return next(new AppError("Authentication failed. Wrong Password or email", 'unauthorized'));
        }
    }

    async logout(req, res, next) {
        const { user: { id } } = req;
        
        await db.AuthSchema.destroy({ where: { userID: id } });
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User Logged out Successfully"
        });
    }
}
export const AuthControllers = new AuthController();



