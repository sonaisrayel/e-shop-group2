import { Category } from "../models/category-model.js";

export const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const newCategory = new Category({ title });
    const category = await newCategory.save();
    res.status(201).send({ category, massage: "Successfully created" });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    if (!categories.length) {
      throw new Error("No categories found!!!");
    } else {
      return res.status(200).send({ categories });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const del = await Category.deleteOne({ title });
    return res.status(200).send({ message: "deleted successfully" });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.find({ _id: id });
    return res.status(200).send(category);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
