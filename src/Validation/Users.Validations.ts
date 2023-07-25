import Joi from "joi";

export const userSchema = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    email: Joi.string().email().required(),
    rool: Joi.string().valid("seller", "buyer").required(),
    password: Joi.string().required()
});
