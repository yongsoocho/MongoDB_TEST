const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	job: {
		type: String,
		default: 'None'
	},
	NIN: {
		type: Number,
		unique: true,
		default: true
	}
});

const model = mongoose.model('User', UserSchema);

module.exports = model;