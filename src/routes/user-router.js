import { Router } from 'express';
const router = Router();

import { getUsers, getUserProducts, deleteUser } from '../controllers/user-controller.js';
import Authorize from '../middlewars/auth-middleware.js';

router.get('/', Authorize.authorized, getUsers);
router.get('/:id/products', getUserProducts);
router.delete('/:id', deleteUser);

export default router;
