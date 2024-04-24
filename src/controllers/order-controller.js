import { Order } from "../models/order-model.js";
import { Bucket } from "../models/bucket-model.js";
import { User } from "../models/user-model.js";
import { Product } from "../models/product-model.js";

import { getTotalPrice } from "../helpers/utils.js";
import ResponseHandler from "../handlers/response-handling.js";
import { notFoundError, validationError } from "../handlers/error-handling.js";

export const createOrder = async (req, res, next) => {
  try {
    const userInfo = req.userInfo;

    const { selectedProducts, paymentMethod } = req.body;

    const bucket = await Bucket.findOne({ userId: userInfo.id });

    if (!bucket) {
      return notFoundError(res, { message: "Bucket not found" });
    }

    const buyerInfo = await User.findOne({ _id: userInfo.id });
    if (!buyerInfo) {
      return notFoundError(res, { message: "Buyer info not found" });
    }

    if (buyerInfo.role !== "buyer") {
      return validationError(res, {
        message: "You are not registered as buyer",
      });
    }

    const selectedProductIds = selectedProducts.map(
      (product) => product.productId,
    );

    const productsHash = {};

    selectedProducts.forEach(({ productId, quantity }) => {
      productsHash[productId] = quantity;
    });

    console.log(selectedProducts.quantity, "qu");

    const products = await Product.find({
      _id: { $in: selectedProductIds },
    }).select("name price ownerId");

    const selectedItems = [];
    const remainingItems = [];

    products.forEach((item) => {
      selectedItems.push({
        name: item.name,
        price: item.price,
        productId: item._id,
        quantity: productsHash[item._id],
        ownerId: item.ownerId,
      });
    });

    bucket.items.forEach((item) => {
      if (!selectedProductIds.includes(String(item.productId))) {
        remainingItems.push(item);
      }
    });

    const totalPriceBucket = await getTotalPrice(remainingItems);

    bucket.items = remainingItems;
    bucket.totalPrice = totalPriceBucket;
    await bucket.save();

    const totalPrice = await getTotalPrice(selectedItems);

    const order = new Order({
      userId: userInfo.id,
      items: selectedItems,
      totalPrice,
      address: buyerInfo.address,
      paymentMethod,
    });

    await order.save();

    return ResponseHandler.handlePostResponse(res, {
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const userInfo = req.userInfo;

    const userOrders = await Order.find({ userId: userInfo.id });

    return ResponseHandler.handleGetResponse(res, userOrders);
  } catch (error) {
    next(error.message);
  }
};

export const getUserOrderById = async (req, res, next) => {
  try {
    const userInfo = req.userInfo;
    const { id } = req.params;

    const userOrder = await Order.findOne({ _id: id });
    return ResponseHandler.handleGetResponse(res, userOrder);
  } catch (error) {
    next(error.message);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, newStatus } = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      { status: newStatus },
      { new: true },
    );

    if (!updatedOrder) {
      return notFoundError(res, {
        message: "Order not found",
      });
    }
    return ResponseHandler.handleUpdateResponse(res, updatedOrder);
  } catch (error) {
    next(error.message);
  }
};
