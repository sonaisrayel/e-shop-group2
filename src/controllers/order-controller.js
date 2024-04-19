import { Order } from "../models/order-model.js";
import { Bucket } from "../models/bucket-model.js";
import { User } from "../models/user-model.js";
import { Product } from "../models/product-model.js";

import { getTotalPrice } from "../helpers/utils.js";
import ResponseHandler from "../handlers/response-handling.js";
import { notFoundError } from "../handlers/error-handling.js";

export const createOrder = async (req, res, next) => {
  try {
    const userInfo = req.userInfo;
    const { selectedProducts, paymentMethod } = req.body;

    const bucket = await Bucket.findOne({ userId: userInfo.id });

    if (!bucket) {
      return notFoundError(res, {
        message: "Bucket not found",
      });
    }

    const selectedItems = [];
    const remainingItems = [];
    for (const item of bucket.items) {
      if (selectedProducts.includes(String(item.productId))) {
        const product = await Product.findOne({ _id: item.productId }).select(
          "name price ownerId",
        );

        if (product) {
          const testobject = {};
          testobject.name = product.name;
          testobject.price = product.price;
          testobject.quantity = item.quantity;
          testobject._id = item._id;
          testobject.productId = item.productId;
          testobject.ownerId = product.ownerId;

          selectedItems.push(testobject);
        }
      } else {
        remainingItems.push(item);
      }
    }

    const totalPriceBucket = await getTotalPrice(remainingItems);
    bucket.items = remainingItems;
    bucket.totalPrice = totalPriceBucket;
    await bucket.save();

    const totalPrice = await getTotalPrice(selectedItems);

    const user = await User.findOne({ _id: userInfo.id });
    if (!user) {
      return notFoundError(res, {
        message: "User not found",
      });
    }

    const order = new Order({
      userId: userInfo.id,
      items: selectedItems,
      totalPrice,
      address: user.address,
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
