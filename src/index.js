import "dotenv/config";

import express from "express";
const app = express();
app.use(express.json());

import { connection } from "./storages/db.js";
import Authorize from "./middlewars/auth-middleware.js";
import { customError } from "./middlewars/error-middleware.js";
const { PORT } = process.env;

connection();

import adminRouter from "../src/routes/admin-router.js";
import authRouter from "../src/routes/auth-router.js";
import categoriesRouter from "../src/routes/category-router.js";
import cardsRouter from "../src/routes/card-router.js";
import bucketsRouter from "../src/routes/bucket-router.js";
import favouritesRouter from "./routes/favourites-router.js";
import ordersRouter from "../src/routes/order-router.js";
import productsRouter from "../src/routes/product-router.js";
import usersRouter from "../src/routes/user-router.js";
import paymentRouter from "../src/routes/payment-router.js";

app.use(express.json());

app.use("/admin", adminRouter);

app.use("/auth", authRouter);
app.use("/category", categoriesRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.use(Authorize.authorized);

app.use("/bucket", bucketsRouter);
app.use("/favourites", favouritesRouter);
app.use("/cards", cardsRouter);
app.use("/orders", ordersRouter);
app.use("/payment", paymentRouter);

app.use(customError);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
