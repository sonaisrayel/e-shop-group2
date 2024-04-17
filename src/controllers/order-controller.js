import { Order } from "../models/order-model.js";
import { Bucket } from "../models/bucket-model.js";
import { User } from "../models/user-model.js";

import { getTotalPrice } from "../helpers/utils.js";
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

export const createOrder = async (req, res, next) => {
  try {
    
    const userInfo = req.userInfo; 
    const { selectedProducts, paymentMethod } = req.body;

    // Find the user's bucket
    const bucket = await Bucket.findOne({ userId: userInfo.id });

    if (!bucket) {
      return res.status(404).json({ error: "Bucket not found" });
    }


    const selectedItems = [];
    const remainingItems = [];
    for (const item of bucket.items) {
      if (selectedProducts.includes(String(item.productId))) {
        selectedItems.push(item);
      } else {
        remainingItems.push(item);
      }
    }

    bucket.items = remainingItems;
    await bucket.save();

  

    const totalPrice = await getTotalPrice(selectedItems);

    const user = await User.find({_id: userInfo.id});
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const address = user.address; // Assuming address is a field in the User model

   
    const order = new Order({
      userInfo,
      products: selectedItems,
      totalPrice,
      address,
      paymentMethod
    });

    
    await order.save();
    return ResponseHandler.handleDeleteResponse(
      res, {
        message: "Order created successfully", 
        order
      } )
    
  } catch (error) {
    next(error); 
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
