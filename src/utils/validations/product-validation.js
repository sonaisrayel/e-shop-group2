import Joi from 'joi';

export const productValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(100),
    category: Joi.string().required(),
    description: Joi.string().required().min(10).max(500),
    price: Joi.number().required().min(0),
    quantity: Joi.number().required().min(0),
    ownerId: Joi.string().required(),
    createdAt: Joi.date().default(new Date()),
    updatedAt: Joi.date().default(null)
})