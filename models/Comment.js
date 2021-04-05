const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	userFullName: {
		type: mongoose.Types.ObjectId,
	},
	blog: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Blog'
	}
}, {
	timestamps: true
});

const model = mongoose.model('Comment', CommentSchema);

module.exports = { model, CommentSchema };