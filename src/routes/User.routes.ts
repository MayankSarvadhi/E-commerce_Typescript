import express, { Express } from "express";
import { asyncWrapper } from "../middleware/index";
import { UserControllers } from "../controller/index";
import passport from "passport";
export const UserRoutes = express.Router();


UserRoutes.post("/", asyncWrapper(UserControllers.create.bind(UserControllers)));
UserRoutes.put("/:id", passport.authenticate('jwt', { session: false }), asyncWrapper(UserControllers.update.bind(UserControllers)));
UserRoutes.delete("/:id", passport.authenticate('jwt', { session: false }), asyncWrapper(UserControllers.delete.bind(UserControllers)));


