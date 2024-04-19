import { Product } from "../models/product-model.js";

export const getTotalPrice = async (itemsArray) => {
  try {
    let totalPrice = 0;

    for (const item of itemsArray) {
      const product = await Product.findOne({ _id: item.productId });
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }

    return totalPrice;
  } catch (error) {
    throw new Error("Error calculating total price: " + error.message);
  }
};
