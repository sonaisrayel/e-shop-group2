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
    if (!buyerInfo || buyerInfo.role !== "buyer") {
      return validationError(res, {
        message: "Buyer info not found or not registered as buyer",
      });
    }

    const selectedProductsIds = selectedProducts.map(
      (product) => product.productId,
    );

    const products = await Product.find({
      _id: { $in: selectedProductsIds },
    }).select("name price ownerId quantity");

    const selectedItems = [];

    for (const product of selectedProducts) {
      const selectedProduct = products.find(
        (p) => p._id.toString() === product.productId,
      );

      if (!selectedProduct || selectedProduct.quantity < product.quantity) {
        return validationError(res, {
          message: `Insufficient quantity available for product ${selectedProduct.name}`,
        });
      }

      const updatedQuantity = selectedProduct.quantity - product.quantity;

      await Product.findOneAndUpdate(
        { _id: selectedProduct._id },
        { quantity: updatedQuantity },
      );

      selectedItems.push({
        ...selectedProduct,
        quantity: product.quantity,
        productId: product.productId,
      });
    }

    const remainingItems = bucket.items.filter(
      (item) => !selectedProductsIds.includes(String(item.productId)),
    );

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
