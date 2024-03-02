import 'dotenv/config';

import express from 'express';
const app = express();

import { connection } from './storages/db.js';
const { PORT } = process.env;

connection();



app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

