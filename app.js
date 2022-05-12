
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv =  require('dotenv').config();

//routes
const productRouter = require('./routes/product');
const tagRouter = require('./routes/tag');
const authRouter = require('./routes/auth');

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/products',productRouter);
app.use('/api/tags',tagRouter);
app.use('/api/users',authRouter);

module.exports = app;