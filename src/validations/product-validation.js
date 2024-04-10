import Joi from "joi";

export const productValidationSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  category: Joi.string().required(),
  description: Joi.string().required().min(10).max(500),
  price: Joi.number().required(),
  quantity: Joi.number().required().min(1),
  ownerId: Joi.string(),
  createdAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(null),
  pictureUrls: Joi.array().items(Joi.string()),
});
