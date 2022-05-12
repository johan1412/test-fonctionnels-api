
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv =  require('dotenv');

//routes
const productRouter = require('./routes/product');
const tagRouter = require('./routes/tag');
const authRouter = require('./routes/auth');



dotenv.config();
//connect to db
mongoose.connect(
  process.env.DB_CONNECT,{ useNewUrlParser: true });
mongoose.connection.once('open',function(){
  console.log('Database connected Successfully');
}).on('error',function(error) {
  console.log('error is',error);
});


//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/products',productRouter);
app.use('/api/tags',tagRouter);
app.use('/api/users',authRouter);

module.exports = app;