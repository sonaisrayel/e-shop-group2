import { Router } from 'express';
const router = Router();

import { getUsers, getUserProducts } from '../controllers/user-controller.js';

router.get('/', getUsers);
router.get('/:id/products', getUserProducts);

export default router;
