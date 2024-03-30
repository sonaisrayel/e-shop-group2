import { Router } from "express";
const router = Router();

import { createOrder } from '../controllers/order-controller.js';

router.post('/', createOrder)

export default router;
