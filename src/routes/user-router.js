import { Router } from "express";
const router = Router();

import {
  getUsers,
  getUserProducts,
  updateUser,
  deleteUser
} from "../controllers/user-controller.js";
import Authorize from "../middlewars/auth-middleware.js";

router.get("/", Authorize.authorized, Authorize.isAdmin, getUsers);
router.get("/:id/products", getUserProducts);
router.patch("/", Authorize.authorized, updateUser);
router.delete("/:id", Authorize.authorized, deleteUser);

export default router;
