import { Router } from "express";
const router = Router();

import {
  createFavourite,
  getFavourites,
  deleteFavourite,
} from "../controllers/favourites-controller.js";

router.post("/", createFavourite);
router.get("/", getFavourites);
router.delete("/:id", deleteFavourite);

export default router;
