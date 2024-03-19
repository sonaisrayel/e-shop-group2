import { Router } from 'express';
const router = Router();

import { createCategory, getCategories, deletCategory, getCategory } from '../controllers/category-controller.js';

router.post("/", createCategory)
router.get("/:id", getCategory)
router.get("/", getCategories)
router.delete("/",deletCategory)


export default router;
