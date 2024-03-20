import { Router } from 'express';
const router = Router();

import { createOrder, getOrders, getOwnerOrders, getUserOrders } from '../controllers/order-controller.js';

router.post('/', createOrder)
router.get('/user', getUserOrders)
router.get('/owner', getOwnerOrders)
router.get('/', getOrders)



export default router;
