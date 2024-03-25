import { Router } from "express";
const router = Router();

import {
  getUsers,
  getUserProducts,
  updateUser,
} from "../controllers/user-controller.js";

import Authorize from "../middlewars/auth-middleware.js";

router.get("/:id/products", getUserProducts);

router.use (Authorize.authorized);
router.patch("/", updateUser);

router.use (Authorize.isAdmin);
router.get("/", getUsers);

export default router;
