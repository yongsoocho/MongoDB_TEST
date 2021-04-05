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

// userRouter.put('/:userId', async (req, res, next) => {
// 	try{
// 		const { userId } = req.params;
// 		const { name, age, NIN, email } = req.body;
// 		if(mongoose.isValidObjectId(userId)) {
// 			const updateBody = {};
// 			if(name) updateBody.name = name;
// 			if(age) updateBody.age = age;
// 			if(NIN) updateBody.NIN = NIN;
// 			if(email) updateBody.email = email;
// 			const putUser = await User.findByIdAndUpdate(userId, updateBody, { new: true });
// 			return res.status(200).json(putUser);
// 		}else{
// 			return res.status(500).send({ err: 'Not user id' });
// 		}
// 	}catch(err){
// 		console.log(err);
// 		return res.status(500).send({ err: err.message });
// 	}
// });
userRouter.put('/:userId', async (req, res, next) => {
	try{
		const { userId } = req.params;
		const { name, NIN, email, job } = req.body;
		if(mongoose.isValidObjectId(userId)){
			const user = await User.findById(userId);
			if(name) {
				user.name = name;
				await Blog.updateMany({ "user._id": userId }, { "user.name": name });	// '$' on array, omit in object
				await Blog.updateMany({}, 
									  { "comment.$[element].userFullName": `${name.first} ${name.last}` }, 
									  { arrayFilters:[{ "element.user._id":userId }] });
			};
			if(NIN) user.NIN = NIN;
			if(email) user.email = email;
			if(job) user.job = job;
			await user.save();	// updateOne() is called
			return res.status(200).json(user);
		}else{
			return res.status(500).send({ err: 'Not user id' });
		}
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

module.exports = userRouter;