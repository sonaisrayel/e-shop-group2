import { Product } from '../models/product-model.js';
import { Favourites } from '../models/favourites-model.js';

export const createFavourite = async (req, res) => {
    try {
        const { userInfo } = req;g
        const { productId } = req.body;
               
        const product = await Product.findById(productId);
        const createdFav = await Favourites.create({product, userId: userInfo.id })

        res.status(201).send({favourite : createdFav})
    } catch (e) {
        res.status(404).send({message: e.message})
    }
}

export const getFavourites = async (req, res) => {
    try {
        const {limit, skip} = req.query
        const { userInfo } = req;
        
        const favourites = await Favourites.find({userId:userInfo.id}).limit(limit).skip(skip);
      
        if (!favourites.length) {
            throw new Error('Favourites not found!');            
        }
        res.status(200).send({favourites});

    } catch (error) {
        res.status(404).send({ "message": error.message });
    }
}
