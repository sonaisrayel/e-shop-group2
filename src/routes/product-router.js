import { Router } from 'express';
const router = Router();

import { getProducts, getProduct, updateProduct} from '../controllers/product-controller.js';

router.get('/', getProducts);
router.get('/:id', getProduct);

router.patch('/:id', updateProduct);

export default router;
