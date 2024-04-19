import { Router } from "express";
const router = Router();

import {
  addToBucket,
  getUserBucket,
  deleteFromBucket,
} from "../controllers/bucket-controller.js";

router.post("/", addToBucket);
router.get("/", getUserBucket);
router.delete("/", deleteFromBucket);

export default router;
