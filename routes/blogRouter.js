const blogRouter = require('express').Router();
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');

blogRouter.get('/', async (req, res, next) => {
	try{
		
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

blogRouter.post('/', async (req, res, next) => {
	try{
		const { title, content, isLive, userId } = req.body;
		if(typeof title !== "string") res.status(400).send({ err:"title must be string" });
		if(typeof content !== "string") res.status(400).send({ err:"content must be string" });
		
		if(mongoose.isValidObjectId(userId)) {
			const exUser = await User.findById(userId);
			if(!exUser){
				return res.status(400).send({ err:"userId is invalid" })
			}
			const blog = new Blog({ ...req.body, user: exUser });	// mongoose extract userId where in exUser
			await blog.save();
			return res.status(201).json(blog);
		}else{
			return res.status(400).send({ err:"userId is invalid" })
		}
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

blogRouter.get('/:blogId', async (req, res, next) => {
	try{
		const { blogId } = req.params;
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

blogRouter.put('/:blogId', async (req, res, next) => {	// edit entire
	try{
		const { blogId } = req.params;
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

blogRouter.patch('/:blogId/live', async (req, res, next) => {	// edit partion
	try{
		const { blogId } = req.params;
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

module.exports = blogRouter;