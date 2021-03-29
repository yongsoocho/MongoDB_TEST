const userRouter = require('express').Router();

userRouter.get('/', async (req, res, next) => {
	try{
		return res.status(200).json({ code:'success', route:'/user' })
	}catch(err){
		console.log(err);
		next(err);
	}
});

module.exports = userRouter;