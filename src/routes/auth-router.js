import { Router } from 'express';
const router = Router();

import { registration } from '../controllers/auth-controller';

router.post('/registration', registration);

export default router;