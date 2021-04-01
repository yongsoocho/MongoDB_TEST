console.log("client code running");

const axios = require('axios');
const URL = "https://mongodb-test-xisaa.run.goorm.io";

// const test = async () => {
// 	console.time("DB loading time: ");
// 	try{
// 		let { data } = await axios.get(`${URL}/blog`);
// 		// console.log(data[0]); // data is blog
// 		data = await Promise.all(data.map(async (data) => {
// 			// const resUser = await axios.get(`${URL}/${data.user}`);
// 			// const resComments = await axios.get(`${URL}/blog/${data._id}/comment`);
// 			const [resUser, resComments] = await Promise.all([
// 				axios.get(`${URL}/user/${data.user}`), 
// 				axios.get(`${URL}/blog/${data._id}/comment`)
// 			]);
// 			data.user = resUser.data;
// 			data.comments = await Promise.all(resComments.data.map(async (comment) => {
// 				const resCommentUser = await axios.get(`${URL}/user/${comment.user}`) // data is comment user
// 				comment.user = resCommentUser.data;
// 				return comment;
// 			}));
// 			return data;
// 		}));
// 		// console.dir(data[0], { depth: 10 });
// 	}catch(err){
// 		console.log(err);
// 	}
// 	console.timeEnd("DB loading time: ");
// };

const test2 = async () => {
	console.time("test2 time: ");
	try{
		let result = await axios.get(`${URL}/blog`);
		// console.dir(result.data[0], { depth: 10 });
	}catch(err){
		console.log(err);
	}
	console.timeEnd("test2 time: ");
};

const testGroup = async () => {
	// await test();
	// await test();
	// await test();
	// await test();
	// await test();

	await test2();
	await test2();
	await test2();
	await test2();
	await test2();
};

testGroup();