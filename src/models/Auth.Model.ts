import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export const AuthSchema = sequelize.define("UserToken", {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
       userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "userInformations",
            key: "id"
        }
    }
});

