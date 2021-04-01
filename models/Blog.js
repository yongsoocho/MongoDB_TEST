const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	isLive: {
		type: Boolean,
		required: true,
		default: false
	},
	user: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User'
	}
}, {
	timestamps: true
});

BlogSchema.virtual("comments", {
	ref:"Comment",
	localField:"_id",	// BlogSchema _id
	foreignField:"blog"	// CommentSchema blog
});

BlogSchema.set("toObject", { virtuals: true });
BlogSchema.set("toJSON", { virtuals: true });

const model = mongoose.model('Blog', BlogSchema);

module.exports = model;