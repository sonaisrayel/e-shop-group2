import { Favourites } from "../models/favourites-model.js";
import ResponseHandler from "../handlers/response-handling.js";
import { notFoundError, duplicateError } from "../handlers/error-handling.js";

export const createFavourite = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { productId } = req.body;

    const existingFav = await Favourites.findOne({
      userId: userInfo.id,
      products: productId,
    });

    if (existingFav) {
      return duplicateError(res, "This product already exists in favorites");
    }


    const createdFav = await Favourites.findOneAndUpdate(
      { userId: userInfo.id },
      { $addToSet: { products: productId } },
      { new: true },
    );

    if (!createdFav) {
      return notFoundError(res, "Something went wrong");
    }

    return ResponseHandler.handlePostResponse(res, { favourite: createdFav });
  } catch (error) {
    next(error.message);
  }
};

export const getFavourites = async (req, res, next) => {
  try {
    const { limit, skip } = req.query;
    const { userInfo } = req;


    const favourites = await
      Favourites.findOne({ userId: userInfo.id }).populate({
        path: "products"
      }).limit(limit).skip(skip);


    const [documents] = await Favourites.find({ userId: userInfo.id }).populate({
      path: 'products'
    });

     const countDocument = documents.products.length

    if (
      !favourites ||
      !favourites.products?.length
    ) {
      return notFoundError(
        res,
        "There are no favourite products for this user!",
      );
    }

    return ResponseHandler.handleListResponse(res, {
      favourites,
      total: countDocument,
    });
  } catch (error) {
    next(error.message);
  }
};

export const deleteFavourite = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const productId = req.params.id;

    const favouriteData = await Favourites.findOneAndUpdate(
      { userId: userInfo.id },
      { $pull: { products: productId } },
      { new: true },
    );

    if (!favouriteData) {
      return notFoundError(res, "Item not found!");
    }

    return ResponseHandler.handleDeleteResponse(res, {
      favourite: favouriteData,
    });
  } catch (error) {
    next(error.message);
  }
};
