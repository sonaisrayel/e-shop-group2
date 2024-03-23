import { Router } from "express";
const router = Router();


import {
  getUsers,
  getUserProducts,
  updateUser,
  addUserImage
} from "../controllers/user-controller.js";
import Authorize from "../middlewars/auth-middleware.js";

router.get("/", Authorize.isAdmin, getUsers);
router.get("/:id/products", getUserProducts);
router.patch("/", Authorize.authorized, updateUser);
router.post('/image', Authorize.authorized, addUserImage);

export default router;
