import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";
import { LogLevels, logger } from "../logger/logger";
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME || "", process.env.DB_USER || "", process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT as Dialect || "postgres",
    port: Number(process.env.DB_PORT) || 5432
});

// DB Connection Check Function:-
(async () => {
    try {
        await sequelize.authenticate();
        logger(LogLevels.info, 'Connection has been established successfully.');
    } catch (error) {
        logger(LogLevels.error, `Unable to connect to the database: ${error}`);
    }
})();