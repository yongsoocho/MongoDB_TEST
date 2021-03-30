const commentRouter = require('express').Router({ mergeParams:true });
const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Blog = require('../models/Blog');
const User = require('../models/User');

commentRouter.get('/', async (req, res, next) => {
	try{
		const { blogId } = req.params;
		return res.status(200).send(blogId);
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

commentRouter.post('/', async (req, res, next) => {
	try{
		const { blogId } = req.params;
		const { content, userId } = req.body;
		if(!mongoose.isValidObjectId(blogId)) res.status(400).send({ err:"blogId is not ObectId" });
		if(!mongoose.isValidObjectId(userId)) res.status(400).send({ err:"userId is not ObectId" });
		if(typeof content !== "string") res.status(400).send({ err:"content is required and string" });
		
		const [blog, user] = await Promise.all([
			Blog.findById(blogId),
			User.findById(userId)
		]);
		// const blog = await Blog.findById(blogId);
		// const user = await User.findById(userId);
		
		if(!blog || !user) res.status(400).send({ err:"404 NOT FOUND ERROR:blog or user" });
		
		if(blog.isLive == false) res.status(400).send({ err:"404 NOT FOUND ERROR:blog is not on live" });
		const comment = new Comment({ content, user, blog });
		await comment.save();
		return res.status(200).json(comment);
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

module.exports = commentRouter;