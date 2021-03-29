const mongoose = require('mongoose');

module.exports = async () => {
	try{
		mongoose.connect('mongodb+srv://root:process.env.DB_PASSWORD@cluster0.z41sh.mongodb.net/test?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		}, () => {
			console.log('Connecting on MongoDB');
		});
		
		mongoose.set('debug', true);
	}catch(err){
		console.log(err);
	}
};