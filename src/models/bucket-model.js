import mongoose from "mongoose";

import { User } from "../models/user-model.js";
import { Product } from "./product-model.js";

const Schema = mongoose.Schema;

const bucketSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: Product,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      productDetails: {
        color: String,
        size: String,
      },
    },
  ],
  status: {
    type: String,
    enum: ["active", "pending", "completed"],
    default: "active",
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: User,
    // required: true,
  },
  billingAddress: {
    type: Schema.Types.ObjectId,
    ref: User,
    // required: true,
  },
});

const Bucket = mongoose.model("Bucket", bucketSchema);
export { Bucket };
