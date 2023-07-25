import express, { Express } from "express";
import { asyncWrapper } from "../middleware/index";
import { AuthControllers } from "../controller/index";
import passport from "passport";

export const AuthRoutes = express.Router();

AuthRoutes.post("/login", asyncWrapper(AuthControllers.login));
AuthRoutes.get("/logout", passport.authenticate('jwt', { session: false }), asyncWrapper(AuthControllers.logout));