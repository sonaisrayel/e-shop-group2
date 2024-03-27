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

    // ,
    // articul: Joi.string().required().custom((value, helpers) => {
    //     const { name, category, description, price, quantity, ownerId } = helpers.parent;
    //     const articul = `${name}-${category}-${description}-${price}-${quantity}-${ownerId}`;
    //     if (!isArticulUnique(articul)) {
    //         return helpers.error('any.custom');
    //     }
    //     return articul;
    // }).messages({
    //     'any.required': 'The articul is required.',
    //     'string.empty': 'The articul must not be empty.',
    //     'any.custom': 'The articul must be unique and contain all product information.'
    // })
})