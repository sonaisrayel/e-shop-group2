import { Router } from "express";
const router = Router();

import { adminLogin } from "../controllers/admin-controller.js";


router.post("/login", adminLogin);


export default router;
