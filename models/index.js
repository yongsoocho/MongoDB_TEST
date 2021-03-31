const mongoose = require('mongoose');
const dotenv = require('dotenv');
 
module.exports = async () => {
	try{
		dotenv.config();
		mongoose.connect('mongodb+srv://root:0302@cluster0.z41sh.mongodb.net/inflearn?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		
		mongoose.set('debug', true);
		
		mongoose.connection.on('open', () => {
			console.log('Connecting on MongoDB!');
		})
		mongoose.connection.on('error', (err) => {
			console.log('Error in MongoDB!!');
		})
	}catch(err){
		console.log(err);
	}
};