import { Router } from "express";
const router = Router();

import { registration, login } from "../controllers/auth-controller.js";


router.post("/registration", registration);
router.post("/login", login);

export default router;
