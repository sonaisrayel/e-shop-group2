import { Router } from "express";
const router = Router();

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controller.js";
import Authorize from "../middlewars/auth-middleware.js";

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", Authorize.authorized, createProduct);
router.patch("/:id", Authorize.authorized, updateProduct);
router.delete("/:id", Authorize.authorized, deleteProduct);

export default router;
