import { Router } from "express";
const router = Router();
import { upload } from "../libs/multer-lib.js";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductImage,
} from "../controllers/product-controller.js";
import Authorize from "../middlewars/auth-middleware.js";

router.get("/:id", getProduct);
router.get("/", getProducts);

router.use(Authorize.authorized);
router.use(Authorize.isSeller);

router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/:id/images", upload.single("file"), addProductImage);

export default router;
