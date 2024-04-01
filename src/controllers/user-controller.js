import { User } from "../models/user-model.js";
import { Product } from "../models/product-model.js";
import ResponseHandler from "../handlers/response-handling.js";
import { validationError, notFoundError } from "../handlers/error-handling.js";

export const getUsers = async (req, res, next) => {
  try {
    const { limit, skip } = req.query;
    const [users, total] = await Promise.all([
      User.find({}).limit(limit).skip(skip).select("-password"),
      User.countDocuments(),
    ]);

    return ResponseHandler.handleListResponse(res, { users, total });
  } catch (error) {
    next(error.message);
  }
};

export const getUserProducts = async (req, res, next) => {
  try {
    const { limit, skip } = req.query;
    const { id } = req.params;

    const [user] = await User.find({ _id: id });

    const [userProducts, totalUserProducts] = await Promise.all([
      Product.find({ ownerId: id }).limit(limit).skip(skip),
      Product.countDocuments({ ownerId: id }),
    ]);

    if (!userProducts.length) {
      throw new Error("Products not found!");
    }

    return ResponseHandler.handleListResponse({
      products: userProducts,
      total: totalUserProducts,
    });
  } catch (error) {
    next(error.message);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { name, surname } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { name, surname },
      { new: true },
    ).select("-password");

    return ResponseHandler.handleUpdateResponse(res, { user: updatedUser });
  } catch (error) {
    next(error.message);
  }
};

export const addUserImage = async (req, res, next) => {
  try {
    const { userInfo } = req;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userInfo.id },
      { pictureUrl: req.file.path },
      { new: true },
    );

    return ResponseHandler.handleUpdateResponse(res, {
      message: "Image uploaded",
      user: updatedUser,
    });
  } catch (error) {
    next(error.message);
  }
};
