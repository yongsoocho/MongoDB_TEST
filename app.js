const express = require('express');
const mongoose = require('mongoose');
const db = require('./models');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const globalRouter = require('./routes/globalRouter');
const blogRouter = require('./routes/blogRouter');
const morgan = require('morgan');
const app = express();


dotenv.config();
db();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use('/', globalRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);

app.listen(3000, () => console.log('Listening on PORT: 3000'));