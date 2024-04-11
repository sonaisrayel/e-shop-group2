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

// export const createSelectedOrder = async (req, res) => {
//   try {
//     const userInfo = req.userInfo;

//     // Retrieve selected product IDs from request body
//     const selectedProducts = req.body.items

//     // Find the user's bucket
//     let bucket = await Bucket.findOne({ userId: userInfo.id });
//     if (!bucket) {
//       return res.status(404).send({ error: "Bucket not found" });
//     }

//     // Filter out selected products from bucket items
//     const selectedItems = bucket.items.filter(item => selectedProducts.includes(item.productId.toString()));

//     // Calculate total price of selected items
//     const totalPrice = await getTotalPrice(selectedItems);

//     // Create order for selected items
//     const order = new Order({
//       userId: userInfo.id,
//       items: selectedItems,
//       totalPrice,
//     });

//     // Save order to database
//     await order.save();

//     // Remove selected items from bucket
//     bucket.items = bucket.items.filter(item => !selectedProducts.includes(item.productId.toString()));

//     // Update total price of bucket items
//     bucket.totalPrice = await getTotalPrice(bucket.items);

//     // Save updated bucket
//     await bucket.save();

//     // Respond with success message and order details
//     return ResponseHandler.handlePostResponse(res, {
//       message: "Order created successfully",
//       order
//     });

//   } catch (error) {
//     res.status(400).send({ message: error.message });
//   }
// }

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
