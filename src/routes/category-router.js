import { Router } from "express";
const router = Router();

import {
  createCategory,
  getCategories,
  deleteCategory,
  getCategory,
} from "../controllers/category-controller.js";

router.post("/", createCategory);
router.get("/:id", getCategories);
router.get("/", getCategory);
router.delete("/", deleteCategory);

export default router;
