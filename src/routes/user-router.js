import { Router } from 'express';
const router = Router();

import { getUsers } from '../controllers/user-controller.js';

router.get('/', getUsers);

export default router;
