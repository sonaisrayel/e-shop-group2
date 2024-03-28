import { Router } from "express";
const router = Router();
import { upload } from "../libs/multer-lib.js";

import {
  getUsers,
  getUserProducts,
  updateUser,
  addUserImage,
} from "../controllers/user-controller.js";

import Authorize from "../middlewars/auth-middleware.js";

router.get("/:id/products", getUserProducts);

router.use (Authorize.authorized);
router.patch("/", updateUser);

router.use (Authorize.isAdmin);
router.get("/", getUsers);

export default router;
