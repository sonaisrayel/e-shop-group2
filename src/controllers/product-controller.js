import { Product } from '../models/product-model.js';
import moment from 'moment';

export const getProducts = async (req, res) => {
    try {
        const {limit, skip} = req.query
        console.log(limit);
        const products = await Product.find({}).limit(limit).skip(skip);
        
        if (!products.length) {
            throw new Error('Products not found!');            
        }
        res.status(200).send({products});

    } catch (error) {
        res.status(404).send({ "message": error.message });
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id });
    
        if (!product) {
            throw new Error("Product not found!");            
        }
        res.status(200).send({product});

    } catch (error) {
        res.status(404).send({ "message": error.message });
    }
}

export const createProduct = async (req, res) => {
    try {

        const { userInfo } = req;
        const { name, category, description, price, quantity } = req.body;

        if (!userInfo) {
            throw new Error('You are not authorized!!!');
        }
        if (userInfo.role !== "seller") {
            throw new Error('For creating product, you must be a seller');
        }

        const createdAt = moment()
        const createdProduct = await Product.create({
            name,
            category,
            description,
            price,
            quantity,
            ownerId: userInfo.id,
            createdAt,
            updatedAt: createdAt
        });

        res.status(201).send({createdProduct})

    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {

        const { userInfo } = req;
        const payload = req.body;
        const { id } = req.params;

        if (!userInfo) {
            throw new Error('You are not authorized!!!');
        }
        if (userInfo.role !== "seller") {
            throw new Error('For updating product, you must be a seller');
        }
         
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, payload, { new: true });

        res.status(201).send({updatedProduct})

    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { userInfo } = req;
        const { id } = req.params;

        if (!userInfo) {
            throw new Error('You are not authorized!!!');
        }
        if (userInfo.role !== "seller") {
            throw new Error('For deleting product, you must be a seller');
        }
        const deletedProduct = await Product.findOneAndDelete({ _id: id });

        res.status(201).send({deletedProduct})

    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
}