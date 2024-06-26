import 'dotenv/config';

import express from 'express';
const app = express();

import { connection } from './storages/db.js';
const { PORT } = process.env;

connection();



import categoriesRouter from '../src/routes/category-router.js';
import bucketsRouter from '../src/routes/bucket-router.js';
import favoritesRouter from '../src/routes/favorites-router.js';
import ordersRouter from '../src/routes/order-router.js';
import productsRouter from '../src/routes/product-router.js';
import usersRouter from '../src/routes/user-router.js';

app.use('/category', categoriesRouter);
app.use('/bucket', bucketsRouter);
app.use('/favorites', favoritesRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);



app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

