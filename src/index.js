import 'dotenv/config';

import express from 'express';
const app = express();
app.use(express.json());


import { connection } from './storages/db.js';
import Authorize from './middlewars/auth-middleware.js';
const { PORT } = process.env;

connection();

import adminRouter from '../src/routes/admin-router.js';
import authRouter from '../src/routes/auth-router.js';
import categoriesRouter from '../src/routes/category-router.js';
import bucketsRouter from '../src/routes/bucket-router.js';
import favoritesRouter from '../src/routes/favorites-router.js';
import ordersRouter from '../src/routes/order-router.js';
import productsRouter from '../src/routes/product-router.js';
import usersRouter from '../src/routes/user-router.js';


app.use(express.json());

app.use('/admin', adminRouter);

app.use('/auth', authRouter);
app.use('/category', categoriesRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.use(Authorize.authorized);

app.use('/bucket', bucketsRouter);
app.use('/favorites', favoritesRouter);
app.use('/orders', ordersRouter);






app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

