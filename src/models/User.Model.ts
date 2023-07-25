import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import bcrypt from "bcrypt";
import AppError from "../utils/AppErrorGenerator";
import { userSchema } from "../Validation/Users.Validations";

export interface UserModel extends Model {
    id: number,
    FirstName: string;
    LastName: string;
    email: string;
    rool: "seller" | "buyer";
    password: string;
    updateAt: Date;
    createAt: Date;
    authenticate(password: string): boolean;
}

export const UsersSchema = sequelize.define<UserModel>('userInformation', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.getDataValue('FirstName')} ${this.getDataValue('LastName')}`
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    rool: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["seller", "buyer"]
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100]
        }
    }
}, {
    hooks: {
        afterValidate: async (user) => {
            user.password = bcrypt.hashSync(user.password, 12);
        }
    },
    timestamps: true,
    tableName: 'userInformation'
});
UsersSchema.prototype.authenticate = function (value, user) {
    if (bcrypt.compareSync(value, this.password)) {
        return user.password
    } else {
        return false;
    }
}
UsersSchema.prototype.validateAsync = async (user : UserModel) => {
    try {
        const userJSON = user.toJSON();
        const data = await userSchema.validateAsync(userJSON);
    } catch (error) {
        throw new AppError(`${error.details[0].message}`, 'invalid_request');
    }
}
