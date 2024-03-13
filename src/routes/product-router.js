import { Router } from 'express';
const router = Router();

import { getProducts, getProduct, createProduct, updateProduct } from '../controllers/product-controller.js';

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.patch('/:id', updateProduct);


export default router;
