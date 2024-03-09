import { Router } from 'express';
const router = Router();

import { getProducts } from '../controllers/product-controller.js';

router.get('/', getProducts);

export default router;
