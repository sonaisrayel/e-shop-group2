import { Product } from '../models/product-model.js';

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        return res.status(200).send(products);
        
    } catch (error) {
        return ("message", error.message)
    }
}

export const getProduct = async (req,res) => {
    try {
        const { id } = req.params;
        const product = await Product.find({ _id: id });
        return res.status(200).send(product);
        
    } catch (error) {
        return ("message", error.message)
    }
}