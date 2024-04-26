import { Router } from "express";
const router = Router();

import {
  createCard,
  getCards,
  deleteCard,
} from "../controllers/card-controller.js";

router.post("/", createCard);
router.get("/", getCards);
router.delete("/:id", deleteCard);

export default router;
