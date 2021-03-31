console.log("client code running");

const axios = require('axios');

const test = async () => {
	try{
		const { data: { blogs } } = await axios.get("https://mongodb-test-xisaa.run.goorm.io/blog");
		console.log(blogs);
		
	}catch(err){
		console.log(err);
	}
};

test();