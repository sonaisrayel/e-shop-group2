import { Router } from "express";
const router = Router();

import {
  createOrderFromBucket,
  createOrder,
  getOrders,
  getUserOrders,
  getUserOrder,
} from "../controllers/order-controller.js";

router.post("/", createOrderFromBucket);
router.post("/create", createOrder);
router.get("/user", getUserOrders);
router.get("/:id", getUserOrder);
// router.get("/owner", getOwnerOrders);
router.get("/", getOrders);
// router.delete("/:id", deleteOrder);

export default router;
