import { Product } from '../models/product-model.js';
import { User } from '../models/user-model.js';
import JWTLib from '../libs/jwt-lib.js'
import moment from 'moment';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
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

    // res.status(200).send({product: product});   res.status(200).send({product});


}

export const createProduct = async (req, res) => {
    try {

        const { authorization } = req.headers;

        const { name, category, description, price, quantity } = req.body;
        const owner = await JWTLib.verifyUserToken(authorization);

        if (owner.role !== "seller") {
            throw new Error('For creating product, you must be a seller');
        }

        const createdAt = moment()
        const createdProduct = await Product.create({
            name,
            category,
            description,
            price,
            quantity,
            ownerId: owner.id,
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
        const { authorization } = req.headers;
        const owner = await JWTLib.verifyUserToken(authorization);

        if (owner.role !== "seller") {
            throw new Error('For updating product, you must be a seller')
        }

        const { id } = req.params;
        const payload = req.body;
    
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, payload, { new: true });

        res.status(201).send({updatedProduct})

    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const owner = await JWTLib.verifyUserToken(authorization);
        console.log(owner);

        if (owner.role !== "seller") {
            throw new Error('For deleting product, you must be a seller')
        }

        const { id } = req.params;
    
        const deletedProduct = await Product.findOneAndDelete({ _id: id });

        res.status(201).send({deletedProduct})

    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
}