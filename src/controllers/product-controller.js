import { Product } from '../models/product-model.js';

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        return res.status(200).send(products);
        
    } catch (error) {
        return ("message", error.message)
    }
}