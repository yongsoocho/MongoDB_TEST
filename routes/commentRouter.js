const commentRouter = require('express').Router({ mergeParams:true });
const mongoose = require('mongoose');
const Comment = require('../models/Comment').model;
const Blog = require('../models/Blog');
const User = require('../models/User');

commentRouter.get('/', async (req, res, next) => {
	try{
		const { blogId } = req.params;
		if(!mongoose.isValidObjectId(blogId)) res.status(400).send({ err:"blogId is not ObectId" });
		
		const comments = await Comment.find({ blog: blogId });
		return res.status(200).json(comments);
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
		
		// if(!blog || !user) res.status(400).send({ err:"404 NOT FOUND ERROR:blog or user" });
		
		if(blog.isLive == false) res.status(400).send({ err:"404 NOT FOUND ERROR:blog is not on live" });
		const comment = new Comment({ content, userId, blog });
		// await comment.save();
		// await Blog.updateOne({ _id:blogId }, { $push: { comments: comment } });
		await Promise.all([
			comment.save(),
			Blog.updateOne({ _id:blogId }, { $push: { comments: comment } })
		]);
		return res.status(200).json(blog);
	}catch(err){
		console.log(err);
		return res.status(500).send({ err: err.message });
	}
});

commentRouter.patch('/:commentId', async (req, res, next) => {
	const { commentId } = req.params;
	const { content } = req.body;
	if(typeof content !== "string") res.send(400).send({ err:"content is required" });
	const [comment] = await Promise.all([
		Comment.findByIdAndUpdate(
			{ _id:commentId }, 
			{ content }, 
			{ new: true }
		),
		Blog.updateOne(
			{ 'comments._id': commentId }, 
			{ 'comments.$.content': content }
		)	// change one in array
	]);
	
	return res.status(200).json(comment);
});

module.exports = commentRouter;