const express = require('express');
const mongoose = require('mongoose');
const db = require('./models');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
// const { userRouter, blogRouter, globalRouter } = require('./routes');
const globalRouter = require('./routes/globalRouter');
const blogRouter = require('./routes/blogRouter');
const commentRouter = require('./routes/commentRouter');
const morgan = require('morgan');
const { generateFakeData } = require('./faker');
const { generateFakeData2 } = require('./faker2');
const app = express();


dotenv.config();
db();

// const faker = async () => {
// 	await generateFakeData(100000, 0, 0);
// 	return console.log('Data Done');
// };
// faker();

// const faker2 = async () => {
// 	await generateFakeData2(5, 10, 15);
// 	return console.log('Data Done');
// };
// faker2();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());


app.use('/', globalRouter);
app.use('/blog/:blogId/comment', commentRouter);
app.use('/blog', blogRouter);
app.use('/user', userRouter);

app.listen(3000, () => console.log('Listening on PORT: 3000'));