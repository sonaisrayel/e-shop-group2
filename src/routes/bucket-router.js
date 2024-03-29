import { Router } from "express";
const router = Router();

import { addToBucket } from "../controllers/bucket-controller.js";

router.post("/add", addToBucket);

export default router;
