import { Router } from "express";
const router = Router();

import {
  createOrder,
  getUserOrders,
  getUserOrderById,
  updateOrderStatus,
} from "../controllers/order-controller.js";

router.post("/", createOrder);
router.get("/", getUserOrders);
router.get("/:id", getUserOrderById);
router.patch("/delivery", updateOrderStatus);

export default router;
