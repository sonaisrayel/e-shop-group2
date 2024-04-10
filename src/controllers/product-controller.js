import fs from "fs";

import { Product } from "../models/product-model.js";
import moment from "moment";
import { productValidationSchema } from "../validations/product-validation.js";
import ResponseHandler from "../handlers/response-handling.js";
import { validationError, notFoundError } from "../handlers/error-handling.js";

export const getProducts = async (req, res, next) => {
  try {
    const { limit, skip } = req.query;

    const [products, totalProducts] = await Promise.all([
      Product.find({}).limit(limit).skip(skip),
      Product.countDocuments({}),
    ]);

    if (!products.length) {
      return notFoundError(res, "Products not found!");
    }
    return ResponseHandler.handleListResponse(res, {
      products,
      total: totalProducts,
    });
  } catch (error) {
    next(error.message);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return notFoundError(res, "Product not found!");
    }
    return ResponseHandler.handleGetResponse(res, { product });
  } catch (error) {
    next(error.message);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { name, category, description, price, quantity } = req.body;

    const { error } = productValidationSchema.validate(req.body);

    if (error) {
      return validationError(res, { message: error.details[0].message });
    }

    const createdAt = moment();
    const createdProduct = await Product.create({
      name,
      category,
      description,
      price,
      quantity,
      ownerId: userInfo.id,
      createdAt,
      updatedAt: createdAt,
    });

    return ResponseHandler.handlePostResponse(res, { createdProduct });
  } catch (error) {
    next(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { id } = req.params;

    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      ownerId: userInfo.id,
    });

    if (!deletedProduct) {
      return notFoundError(res, "Product not found or not deleted.");
    }

    return ResponseHandler.handleDeleteResponse(res, { deletedProduct });
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const payload = req.body;
    const { userInfo } = req;
    const { id } = req.params;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, ownerId: userInfo.id },
      payload,
      { new: true },
    );

    if (!updatedProduct) {
      return notFoundError(res, "Product not found or not updated.");
    }

    return ResponseHandler.handleUpdateResponse(res, { updatedProduct });
  } catch (error) {
    next(error.message);
  }
};

export const addProductImage = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { file } = req;
    const { id } = req.params;

    if (!file) {
      return notFoundError(res, "You need to attach a file");
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, ownerId: userInfo.id },
      { $addToSet: { pictureUrls: file.path } },
      { new: true, upsert: true },
    );

    if (!updatedProduct) {
      return notFoundError(res, "Product not found or not updated.");
    }

    return ResponseHandler.handleUpdateResponse(res, { updatedProduct });
  } catch (error) {
    next(error.message);
  }
};

export const deleteProductImage = async (req, res, next) => {
  try {
    const { userInfo } = req;
    const { id } = req.params;
    const { index } = req.body;

    const product = await Product.findOne({ _id: id, ownerId: userInfo.id });
    if (!product) {
      return notFoundError(res, "Product not found.");
    }

    const deletedImagePath = product.pictureUrls[index];
    fs.unlinkSync(deletedImagePath);

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, ownerId: userInfo.id },
      { $pull: { pictureUrls: product.pictureUrls[index] } },
      { new: true },
    );

    if (!updatedProduct) {
      return notFoundError(res, "Product not updated.");
    }

    return ResponseHandler.handleUpdateResponse(res, { updatedProduct });
  } catch (error) {
    next(error.message);
  }
};
