import { Router } from 'express';
const router = Router();

import { getProducts, getProduct} from '../controllers/product-controller.js';

router.get('/', getProducts);
router.get('/:id', getProduct);


export default router;
