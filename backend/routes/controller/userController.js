const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const userService = require('../service/userService');
const bcrypt = require('bcrypt');
const path = require('path');
const moment = require('moment');
const fs = require('fs');
async function getUserData(req, res) {
	try {
		let returnData = await userService.userData(req);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function loginUser(req, res) {
	try {
		const email_id = req.body.email_id;
		const password = req.body.password;
		let returnData = await userService.loginUserByEmailId(email_id, password);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
		return res.status(200).json(err);
	}
}
async function signUpUser(req, res) {
	try {
		let returnData = await userService.signUpUser(req);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function checkUser(req, res) {
	try {
		const contact = req.body.contact;
		let returnData = await userService.checkUser(contact);
		if (returnData.length > 0) {
			if (returnData[0].contact == contact) {
				returnData = {
					statusCode: 200,
					data: 'number exist',
				};
			} else {
				returnData = {
					statusCode: 500,
					data: 'Invalid number',
				};
			}
		} else {
			returnData = {
				statusCode: 500,
				data: 'Invalid number',
			};
		}
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function updatePassword(req, res) {
	try {
		let returnData = await userService.updatePassword(req);
		console.log('returnData', returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function saveImage(files) {
	const user_id = files.user_id;
	// console.log(user_id);
	const profileImage = files.profileImage;
	var fileName =
		user_id + '_' + moment().format('YYYYMMDDhhmmss') + '_' + files.fileName;
	const filePath = path.join(__dirname, '../../uploads/profileImg/' + fileName);
	// console.log(filePath);
	const file = fs.createWriteStream(filePath);
	file.write(profileImage, 'base64');
	// file.mv(filePath, (err) => {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// });
	const relativePath = './uploads/profileImg/' + fileName;
	return relativePath;
}
async function uploadImage(req, res) {
	const user_id = parseInt(req.body.user_id);
	// console.log(req.get('user_id'));
	// console.log(user_id);
	const path = await saveImage(req.body);
	try {
		let returnData = await userService.uploadImage(user_id, path);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
	return res.status(404).json({ data: 'Error' });
}
async function showAllImages(req, res) {
	try {
		let returnData = await userService.showAllImages();
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getUserDetailsById(req, res) {
	try {
		let returnData = await userService.getUserDetailsById(req);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
router.get('/userData', getUserData);
router.post('/login', loginUser);
router.post('/signup', signUpUser);
router.post('/checkUser', checkUser);
router.post('/updatePassword', updatePassword);
router.post('/img/upload', uploadImage);
router.get('/img/show', showAllImages);
router.post('/user',getUserDetailsById)
module.exports = router;
