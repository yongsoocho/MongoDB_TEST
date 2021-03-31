const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		first:{
			type: String,
			required: true
		},
		last:{
			type: String,
			required: true
		}
	},
	age: {
		type: Number
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String
	}
}, {
	timestamps: true
});

const model = mongoose.model('User', UserSchema);

module.exports = model;