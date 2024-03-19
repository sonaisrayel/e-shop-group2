import { Router } from 'express';
const router = Router();

import { createFavourite } from '../controllers/favourites-controller.js';

router.post('/', createFavourite);

export default router;
