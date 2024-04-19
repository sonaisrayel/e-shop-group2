import { Category } from "../models/category-model.js";
import ResponseHandler from "../handlers/response-handling.js";
import { notFoundError } from "../handlers/error-handling.js";

export const createCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const newCategory = new Category({ title });
    const category = await newCategory.save();
    return ResponseHandler.handlePostResponse(res, {
      message: "Successfully created",
      category,
    });
  } catch (error) {
    next(error.message);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    if (!categories.length) {
      return notFoundError(res, {
        message: "No categories found!!!",
      });
    } else {
      return ResponseHandler.handleGetResponse(res, categories);
    }
  } catch (error) {
    next(error.message);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const del = await Category.deleteOne({ title });
    return ResponseHandler.handleDeleteResponse(res, {
      message: "deleted successfully",
    });
  } catch (error) {
    next(error.message);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.find({ _id: id });
    return ResponseHandler.handleGetResponse(res, category);
  } catch (error) {
    next(error.message);
  }
};
