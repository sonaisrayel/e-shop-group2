import { Order } from "../models/order-model.js";
import { Product } from "../models/product-model.js";
import { User } from "../models/user-model.js";
import { Bucket } from "../models/bucket-model.js";
import { getTotalPrice } from "../utils/validations/totalPrice.js";
import ResponseHandler from "../handlers/response-handling.js";

export const createOrderFromBucket = async (req, res) => {
  try {
    const userInfo = req.userInfo;

    const bucket = await Bucket.findOne({ userId: userInfo.id });

    if (!bucket || !bucket.items.length) {
      return res.status(400).send({ error: "Bucket is empty" });
    }

    const totalPrice = await getTotalPrice(bucket.items);

    const order = new Order({
      userId: userInfo.id,
      items: bucket.items,
      totalPrice,
    });

    await order.save();

    await Bucket.findOneAndUpdate(
      { userId: userInfo.id },
      { items: [], totalPrice: 0 },
    );

    return ResponseHandler.handlePostResponse(res, {
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error.message);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userInfo = req.userInfo;

    const userOrders = await Order.find({ userId: userInfo.id });

    return ResponseHandler.handleGetResponse(res, userOrders);
  } catch (error) {
    next(error.message);
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const userInfo = req.userInfo;
    const { id } = req.params;

    const userOrder = await Order.findOne({ _id: id });
    return ResponseHandler.handleGetResponse(res, userOrder);
  } catch (error) {
    next(error.message);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    res.status(200).send(orders);
  } catch (error) {
    res.status(404).send({ error: "Something went wrong" });
  }
};
