import { Product } from '../models/product-model.js';
import { Favourites } from '../models/favourites-model.js';

export const createFavourite = async (req, res) => {
    try {
        const { userInfo } = req;
        const { productId } = req.body;
               
        const product = await Product.findById(productId);
        const createdFav = await Favourites.create({product, userId: userInfo.id })

        res.status(201).send({favourite : createdFav})
    } catch (e) {
        res.status(404).send({message: e.message})
    }
}

