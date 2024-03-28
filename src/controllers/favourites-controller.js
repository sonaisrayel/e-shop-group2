import { Favourites } from '../models/favourites-model.js';

export const createFavourite = async (req, res) => {
    try {
        const { userInfo } = req;
        const { productId } = req.body;

        const existingFav = await Favourites.findOne({ userId: userInfo.id, products: productId });
        if (existingFav) {
            throw new Error('This product already exists in favorites');
        }

        const createdFav = await Favourites.findOneAndUpdate(
            { userId: userInfo.id },
            { $addToSet: { products: productId } },
            { new: true, upsert: true }
        );

        if (!createdFav) {
            throw new Error('Something went wrong');
        }

        res.status(201).send({ favourite: createdFav });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
}

export const getFavourites = async (req, res) => {
    try {
        const { limit, skip } = req.query
        const { userInfo } = req;

        const [favourites, totalFavourites] = await Promise.all([
            Favourites.findOne({ userId: userInfo.id })
                .populate({
                    path: 'products',
                    options: {
                        limit: parseInt(limit),
                        skip: parseInt(skip)
                    }
                }),

            Favourites.findOne({ userId: userInfo.id })
                .populate('products')
                .then(favourites => favourites ? favourites.products.length : 0)
        ])


        if (!favourites || !favourites.products || favourites.products.length === 0) {
            throw new Error('There are no favourite products for this user!');
        }

        res.status(200).send({ favourites, total: totalFavourites });

    } catch (error) {
        res.status(404).send({ "message": error.message });
    }
}

export const deleteFavourite = async (req, res) => {
    try {

        const { userInfo } = req;
        const productId = req.params.id;

        const favouriteData = await Favourites.findOneAndDelete(
            { userId: userInfo.id },
            { $pull: { products: { _id: productId } } },
            { new: true } 
            );

            if (!favouriteData) {  
                throw new Error('Item not found!');            
            }


        res.status(200).send({ favourite: favouriteData });

    } catch (error) {
        res.status(404).send({ "message": error.message });
    }
}