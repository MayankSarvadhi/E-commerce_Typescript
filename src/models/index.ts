import { Sequelize } from "sequelize";
import { sequelize } from "../config/db";
import { UsersSchema } from "./User.Model";
import { AuthSchema } from "./Auth.Model";
import { ProductSchema } from "./Product.model";

export let db = {
    Sequelize,
    sequelize,
    UsersSchema,
    AuthSchema,
    ProductSchema
}

// db.sequelize.sync({force : false});
