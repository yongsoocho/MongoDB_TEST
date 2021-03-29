const express = require('express');
const mongoose = require('mongoose');
const db = require('./models');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const globalRouter = require('./routes/globalRouter');
const app = express();

dotenv.config();
db();

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use('/user', userRouter);

app.listen(3000, ()=>{
	console.log(`☞ Listening no 3000`)
})