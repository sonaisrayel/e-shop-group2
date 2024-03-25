import Joi from "joi";

const regexpr = new RegExp("^[a-zA-Z0-9]{6,}$");

export const passwordValidationSchema = Joi.object({
  password: Joi.string().regex(regexpr).required(),
  repeatPassword: Joi.ref("password"),
}).with("password", "repeatPassword");
