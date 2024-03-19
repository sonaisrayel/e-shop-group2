import { Router } from 'express';
const router = Router();

import { createFavourite, getFavourites } from '../controllers/favourites-controller.js';

router.post('/', createFavourite);
router.get('/', getFavourites);

export default router;
