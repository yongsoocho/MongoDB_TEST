const userRouter = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User');

userRouter.get('/', async (req, res, next) => {
	try{
		const users = await User.find({}); // return Array , findOne returns Object
		return res.status(200).json(users);
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

userRouter.post('/', async (req, res, next) => {
	try{
		const newUser = await User.create(req.body);
		return res.status(201).json(newUser);
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

userRouter.get('/:userId', async (req, res, next) => {
	try{
		const { userId } = req.params;
		if(mongoose.isValidObjectId(userId)) {
			const user = await User.findOne({ _id: userId });
			return res.status(200).json(user);
		}else{
			return res.status(500).send({ err: 'Not user id' });
		}
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

userRouter.delete('/:userId', async (req, res, next) => {
	try{
		const { userId } = req.params;
		if(mongoose.isValidObjectId(userId)) {	// when exUser is not founded return null , deleteOne do not return 
			const exUser = await User.findOneAndDelete({
				_id: userId
			}, {});
			return res.status(200).json(exUser);
		}else{
			return res.status(500).send({ err: 'Not user id' });
		}
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

userRouter.put('/:userId', async (req, res, next) => {
	try{
		const { userId } = req.params;
		const { name } = req.body;
		if(mongoose.isValidObjectId(userId)) {
			const { age } = req.body;
			const putUser = await User.findByIdAndUpdate(userId, {
				$set:{
					age,
					name
				}
			}, {
				new: true
			});
			return res.status(200).json(putUser);
		}else{
			return res.status(500).send({ err: 'Not user id' });
		}
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

module.exports = userRouter;