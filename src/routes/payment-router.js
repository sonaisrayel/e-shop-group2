import express from "express";

const router = express.Router();

import {
  createPaymentMethod,
  deletePaymentMethod,
  updateUserPaymentMethod,
} from "../controllers/payment-method-controller.js";

router.post("/", createPaymentMethod);
router.post("/:paymentMethodId", updateUserPaymentMethod);
router.delete("/:paymentMethodId", deletePaymentMethod);

export default router;
