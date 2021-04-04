const blogRouter = require('express').Router();
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');

blogRouter.get('/', async (req, res, next) => {
	try{
		const blogs = await Blog.find({})
		.limit(10)
		// .populate([ { path:"user" }, { path:"comments", populate: { path:"user" } } ]);
		return res.json(blogs);
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
		if(mongoose.isValidObjectId(blogId)) {
			const blog = await Blog.findOne({ _id:blogId });
			return res.json(blog);
		}else{
			return res.status(400).send({ err:"blogId is invalid" });
		}
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

blogRouter.put('/:blogId', async (req, res, next) => {	// edit entire
	try{
		const { blogId } = req.params;
		if(!mongoose.isValidObjectId(blogId)) res.status(400).send({ err:"blogId is invalid" })
		
		const { title, content, isLive } = req.body;
		if(typeof title !== "string") res.status(400).send({ err:"title must be string" });
		if(typeof content !== "string") res.status(400).send({ err:"content must be string" });
		
		const updateBody = {};
		if(title) updateBody.title = title;
		if(content) updateBody.content = content;
		if(isLive.toString()) updateBody.isLive = isLive;
		
		const blog = await Blog.findOneAndUpdate({ _id:blogId }, updateBody, {
			new: true
		});

		return res.status(200).json(blog);
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

blogRouter.patch('/:blogId/live', async (req, res, next) => {	// edit partion
	try{
		const { blogId } = req.params;
		if(!mongoose.isValidObjectId(blogId)) res.status(400).send({ err:"blogId is invalid" });
		
		const { isLive } = req.body;
		if(typeof isLive !== "boolean") res.status(400).send({ err:"isLive must be required and boolean" });
		
		const blog = await Blog.findByIdAndUpdate(blogId, { isLive }, {
			new: true
		});
		return res.status(200).json(blog);
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

module.exports = blogRouter;