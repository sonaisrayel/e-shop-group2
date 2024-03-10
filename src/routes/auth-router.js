import { Router } from 'express';
const router = Router();

import { registration } from '../controllers/auth-controller.js';

router.post('/registration', registration);

export default router;