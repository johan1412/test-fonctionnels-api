var cors = require('cors')

const express = require('express');
const app = express();
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

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/products',productRouter);
app.use('/api/tags',tagRouter);
app.use('/api/users',authRouter);



// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});