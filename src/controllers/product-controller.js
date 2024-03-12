import { Product } from '../models/product-model.js';
import { User } from '../models/user-model.js';
import JWTLib from '../libs/jwt-lib.js'

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


export const updateProduct = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const owner = await JWTLib.verifyUserToken(authorization);
        const ownerData = await User.findById(owner.id);

        if (ownerData.userType !== "seller") {
            throw new Error('For creating product, you must be a seller')
        }

        const { id } = req.params;
        const payload = req.body;
        console.log(payload);

        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, payload, { new: true });

        res.status(201).send({ data: updatedProduct })

    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
}