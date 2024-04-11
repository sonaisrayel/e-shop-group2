import Joi from "joi";

export const userValidationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  surname: Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeatPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    region: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
  }),
}).with("password", "repeatPassword");
