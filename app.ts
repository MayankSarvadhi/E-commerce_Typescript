import express, { Express } from "express";
import * as dotenv from "dotenv";
import { LogLevels, logger } from "./src/logger/logger";
dotenv.config();
import { ErrorHandler } from "./src/middleware/ErrorHandler";
import { routes } from "./src/routes/index";
import passport from "passport";
import "./src/config/Authentication";
import path from "path"

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use("/uploads", express.static(path.join("uploads")));

app.use(routes);
app.use(ErrorHandler);
app.listen(port, () => logger(LogLevels.info, `Server is Listening on Port:- ${port}`));

