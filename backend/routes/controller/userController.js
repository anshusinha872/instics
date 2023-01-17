const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const userService = require('../service/userService');
async function getUserData(req, res) {
	try {
		// console.log('getUserData');
		let returnData = await userService.userData(req);
		// console.log('returnData', returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function loginUser(req, res) {
	try {
		const email_id = req.body.email_id;
		const password = req.body.password;
		console.log('email_id', email_id);
		console.log('password', password);
		let returnData = await userService.loginUserByEmailId(email_id);
		console.log('returnData', returnData);
		if (returnData.length > 0) {
			if (returnData[0].password == password) {
				returnData = {
					statusCode: 200,
					// data: returnData,
					data:'Login Success'
				};
			} else {
				returnData = {
					statusCode: 500,
					data: 'Invalid Password',
				};
			}
		}
		else {
			returnData = {
				statusCode: 500,
				data: 'Invalid Email Id',
			};
		}
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function signUpUser(req, res) {
	try {
		let returnData = await userService.signUpUser(req);
		// console.log('returnData', returnData);
		return res.status(200).json(returnData);
	}
	catch (err) {
		console.log(err);
	}
}
router.get('/userData', getUserData);
router.post('/login', loginUser);
router.post('/signup', signUpUser);
module.exports = router;
