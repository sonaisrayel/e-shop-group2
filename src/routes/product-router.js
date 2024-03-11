import { Router } from 'express';
const router = Router();

import { getProducts, getProduct, createProduct} from '../controllers/product-controller.js';

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);


export default router;
