import { Router } from "express";
const router = Router();

import {
  getUsers,
  getUserProducts,
  updateUser,
} from "../controllers/user-controller.js";
import Authorize from "../middlewars/auth-middleware.js";

router.get("/", Authorize.authorized, Authorize.isAdmin, getUsers);
router.get("/:id/products", getUserProducts);
router.patch("/", Authorize.authorized, updateUser);

export default router;
