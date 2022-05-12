var cors = require('cors')

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv =  require('dotenv');
// const bodyParser =  require('body-parser');

app.use(cors()) // Use this after the variable declaration

//routes
const productRouter = require('./routes/product');
const tagRouter = require('./routes/tag');
const authRouter = require('./routes/auth');



dotenv.config();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
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



app.listen(3000);