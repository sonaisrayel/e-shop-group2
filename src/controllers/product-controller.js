import { Product } from "../models/product-model.js";
import moment from "moment";
import { productValidationSchema } from "../utils/validations/product-validation.js";

export const getProducts = async (req, res) => {
  try {
    const { limit, skip } = req.query;

    const [products, totalProducts] = await Promise.all([
      Product.find({}).limit(limit).skip(skip),
      Product.countDocuments({}),
    ]);

    if (!products.length) {
      throw new Error("Products not found!");
    }
    res.status(200).send({ products, total: totalProducts });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      throw new Error("Product not found!");
    }
    res.status(200).send({ product });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { userInfo } = req;
    const { name, category, description, price, quantity } = req.body;

    const { error } = productValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }

    const createdAt = moment();
    const createdProduct = await Product.create({
      name,
      category,
      description,
      price,
      quantity,
      ownerId: userInfo.id,
      createdAt,
      updatedAt: createdAt,
    });

    res.status(201).send({ createdProduct });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { userInfo } = req;
    const { id } = req.params;

    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      ownerId: userInfo.id,
    });

    if (!deletedProduct) {
      return res
        .status(404)
        .send({ message: "Product not found or not deleted." });
    }

    res.status(201).send({ deletedProduct });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const payload = req.body;
    const { userInfo } = req;
    const { id } = req.params;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, ownerId: userInfo.id },
      payload,
      { new: true },
    );

    if (!updatedProduct) {
      throw new Error("Product not found or not updated.");
    }

    res.status(201).send({ updatedProduct });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const addProductImage = async (req, res) => {
  try {
    const { userInfo } = req;
    const { file } = req;
    const { id } = req.params;

    if (!file) {
      throw new Error("You need to attach a file");
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, ownerId: userInfo.id },
      { $addToSet: { pictureUrls: file.path } },
      { new: true, upsert: true },
    );

    if (!updatedProduct) {
      throw new Error("Product not found or not updated.");
    }

    res.status(201).send({ updatedProduct });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
