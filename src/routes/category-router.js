import { Router } from "express";
const router = Router();

import {
  createCategory,
  getCategory,
  deletCategory,
  getOneCategory,
} from "../controllers/category-controller.js";

router.post("/", createCategory);
router.get("/:id", getOneCategory);
router.get("/", getCategory);
router.delete("/", deletCategory);

export default router;
