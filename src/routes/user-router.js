import { Router } from "express";
const router = Router();
import { upload } from '../libs/multer-lib.js';


import {
  getUsers,
  getUserProducts,
  updateUser,
  addUserImage,
} from "../controllers/user-controller.js";
import Authorize from "../middlewars/auth-middleware.js";

router.get("/", Authorize.isAdmin, getUsers);
router.get("/:id/products", getUserProducts);
router.patch("/", Authorize.authorized, updateUser);
router.patch("/image", upload.single('file'), Authorize.authorized, addUserImage);

export default router;
