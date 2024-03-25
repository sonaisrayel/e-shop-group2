import { User } from "../models/user-model.js";
import { Product } from "../models/product-model.js";
import ResponseHandler from "../utils/response-handling.js";

export const getUsers = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const { userInfo } = req;

    const [users, total] = await Promise.all([
      User.find({}).limit(limit).skip(skip).select("-password"),
      User.countDocuments(),
    ]);

    return ResponseHandler.handleListResponse(res, { users, total });
  } catch (error) {
    return ResponseHandler.handleErrorResponse({ message: error.message }, res);
  }
};

export const getUserProducts = async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const { id } = req.params;

    const [user] = await User.find({ _id: id });

    if (!user) {
      return ResponseHandler.handleErrorResponse("This user doesn't exist", res);
    }

    const userProducts = await Product.find({ ownerId: id })
      .limit(limit)
      .skip(skip);

    return ResponseHandler.handleListResponse(res, { userProducts });
  } catch (error) {
    return ResponseHandler.handleErrorResponse({ message: error.message }, res);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.userInfo;
    const { name, surname } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { name, surname },
      { new: true },
    );

    return ResponseHandler.handleUpdateResponse(res, {user: updatedUser });
  } catch (e) {
    return ResponseHandler.handleErrorResponse({ message: error.message }, res);
  }
};

export const addUserImage = async (req, res) => {
  try {
    const { userInfo } = req;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userInfo.id },
      { pictureUrl: req.file.path },
      { new: true },
    );
    return ResponseHandler.handleUpdateResponse(res,{ message: "Image uploaded", user: updatedUser });
  } catch (e) {
    return ResponseHandler.handleErrorResponse({ message: error.message }, res);
  }
};
