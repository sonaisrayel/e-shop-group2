import { Product } from '../models/product-model.js';
import { User } from '../models/user-model.js';
import JWTLib from '../libs/jwt-lib.js'
import moment from 'moment';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).send(products);

    } catch (error) {
        return ("message", error.message)
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.find({ _id: id });
        return res.status(200).send(product);

    } catch (error) {
        return ("message", error.message)
    }
}

export const createProduct = async (req, res) => {
    try {

        const { authorization } = req.headers;

        const { name, category, description, price, quantity } = req.body;
        const owner = await JWTLib.verifyUserToken(authorization);

        const ownerData = await User.findById(owner.id);

        if (ownerData.userType !== "seller") {
            throw new Error('For creating product, you must be a seller')
        }

        const createdAt = moment()
        console.log(createdAt)
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

        res.status(201).send({ data: createdProduct })

    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const owner = await JWTLib.verifyUserToken(authorization);
        const ownerData = await User.findById(owner.id);

        if (ownerData.userType !== "seller") {
            throw new Error('For updating product, you must be a seller')
        }

        const { id } = req.params;
        const payload = req.body;
    
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, payload, { new: true });

        res.status(201).send({ data: updatedProduct })

    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
}