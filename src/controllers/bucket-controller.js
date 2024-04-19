import { Product } from "../models/product-model.js";
import { Bucket } from "../models/bucket-model.js";
import { User } from "../models/user-model.js";
import { getTotalPrice } from "../helpers/utils.js";
import ResponseHandler from "../handlers/response-handling.js";
import { notFoundError } from "../handlers/error-handling.js";

export const addToBucket = async (req, res, next) => {
  try {
    const userInfo = req.userInfo;

    const { productId, quantity } = req.body;
    const product = await Product.findOne({ _id: productId });
    const price = product.price;

    if (!product) {
      return notFoundError(res, {
        message: "Product not found",
      });
    }

    const bucket = await Bucket.findOne({ userId: userInfo.id });

    const existPrduct = bucket.items.find(
      (item) => String(item.productId) === String(productId),
    );

    if (existPrduct) {
      bucket.items.find(
        (item) => String(item.productId) === String(productId),
      ).quantity = quantity;
    } else {
      bucket.items.push({ productId, quantity, price });
    }

    if (product.quantity < quantity) {
      return notFoundError(res, {
        message: "The mentioned quantity is not available",
      });
    }

    bucket.totalPrice = await getTotalPrice(bucket.items);

    await bucket.save();

    return ResponseHandler.handlePostResponse(res, {
      message: "The item is added to the bucket",
      bucket,
    });
  } catch (error) {
    next(error.message);
  }
};

export const getUserBucket = async (req, res, next) => {
  try {
    const userInfo = req.userInfo;

    const bucket = await Bucket.findOne({ userId: userInfo.id });

    if (!bucket) {
      return notFoundError(res, {
        message: "Bucket not found",
      });
    }
    return ResponseHandler.handleGetResponse(res, bucket);
  } catch (error) {
    next(error.message);
  }
};

export const deleteFromBucket = async (req, res, next) => {
  try {
    const userInfo = req.userInfo;

    const { productId } = req.body;

    const bucket = await Bucket.findOne({ userId: userInfo.id });

    const savedProducts = bucket.items;

    if (!bucket) {
      return notFoundError(res, {
        message: "Bucket not found",
      });
    }

    const existItem = savedProducts.find(
      (item) => String(item.productId) === String(productId),
    );

    const existItemIndex = savedProducts.findIndex(
      (item) => String(item.productId) === String(productId),
    );

    if (!existItem) {
      return notFoundError(res, {
        message: "Product not found in the bucket",
      });
    }

    savedProducts.splice(existItemIndex, 1);

    bucket.totalPrice = await getTotalPrice(bucket.items);

    await bucket.save();

    return ResponseHandler.handleDeleteResponse(res, {
      message: "Product removed from bucket successfully",
      bucket,
    });
  } catch (error) {
    next(error.message);
  }
};
