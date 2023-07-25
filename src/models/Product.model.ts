import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
// make interface
interface ProductAttributes extends Model {
  id: string;
  productName: string;
  price: number;
  description: string;
  image: string;
  category: "Electronics" | "cloths" | "vehicles" | "toys";
  userID: number;
}

export const ProductSchema = sequelize.define<ProductAttributes>('ProductData', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    productName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate : {
            notEmpty : true
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate : { 
            notEmpty : true
        }
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate : {
            notEmpty : true
        }
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "./uploads/placeholder.jpeg",
        validate : {
            notEmpty : true
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ['Electronics', 'cloths', 'vehicles', 'toys'],
        validate : {
            notEmpty : true
        }
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
            notEmpty : true
        },
        references: {
            model: "userInformations",
            key: "id"
        }
    }
});

