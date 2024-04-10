import { Product } from "../models/product-model.js";
import { Bucket } from "../models/bucket-model.js";
import { getTotalPrice } from "../helpers/utils.js";
import ResponseHandler from "../handlers/response-handling.js";

export const addToBucket = async (req, res) => {
  try {
    const userInfo = req.userInfo;

    const { productId, quantity } = req.body;
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      res.status(404).send({ error: "Product not found" });
    }

    let bucket = await Bucket.findOne({ userId: userInfo.id }); //???

    if (!bucket) {
      bucket = new Bucket({
        userId: userInfo.id,
        items: [{ productId, quantity }],
        totalPrice: await getTotalPrice(bucket.items),
      });

      await bucket.save();
      res.status(201).send(bucket);
    }

    const existPrduct = bucket.items.find(
      (item) => String(item.productId) === String(productId),
    );

    if (existPrduct) {
      bucket.items.find(
        (item) => String(item.productId) === String(productId),
      ).quantity = quantity;
    } else {
      bucket.items.push({ productId, quantity });
    }

    if (product.quantity < req.body.quantity) {
      res
        .status(400)
        .send({ error: "The mentioned quantity is not available" });
      return;
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

export const getUserBucket = async (req, res) => {
  try {
    const userInfo = req.userInfo;

    let bucket = await Bucket.findOne({ userId: userInfo.id }); //???

    if (!bucket) {
      res.status(404).send({ error: "Bucket not found" });
    }

    return ResponseHandler.handleGetResponse(res, bucket);
  } catch (error) {
    next(error.message);
  }
};

export const deleteFromBucket = async (req, res) => {
  try {
    const userInfo = req.userInfo;

    const { productId } = req.body;

    let bucket = await Bucket.findOne({ userId: userInfo.id });

    if (!bucket) {
      res.status(404).send({ error: "Bucket not found" });
    }

    const existItem = bucket.items.find(
      (item) => String(item.productId) === String(productId),
    );

    if (!existItem) {
      return res.status(404).send({ error: "Product not found in bucket" });
    }

    bucket.items.splice(existItem, 1);

    bucket.totalPrice = await getTotalPrice(bucket.items);

    await bucket.save();

    return ResponseHandler.handleDeleteResponse(
      res,
      "Product removed from bucket successfully",
    );
  } catch (error) {
    next(error.message);
  }
};
