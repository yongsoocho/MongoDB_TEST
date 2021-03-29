const globalRouter = require('express').Router();

globalRouter.get('/', async (req, res, next) => {
	try{
		return res.status(200).json({ code:'success', route:'/user' })
	}catch(err){
		console.log(err);
		next(err);
	}
});

module.exports = globalRouter;