const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const userService = require('../service/userService');
const bcrypt = require('bcrypt');
const path = require('path');
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
		let returnData = await userService.loginUserByEmailId(email_id, password);
		console.log('returnData', returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
		return res.status(200).json(err);
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

async function forgotPassword(req, res) {
	// console.log('here'+req.body);
	try {
		const contact = req.body.contact;
		// const password = req.body.password;
		// console.log('email_id', email_id);
		console.log('contact',contact);
		let returnData = await userService.forgotPassword(contact);
		console.log('returnData', returnData);
		if (returnData.length > 0) {
			if (returnData[0].contact == contact) {
				returnData = {
					statusCode: 200,
					// data: returnData,
					data:'number exist'
				};
			} else {
				returnData = {
					statusCode: 500,
					data: 'Invalid number',
				};
			}
		}
		else {
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
	}
	catch (err) {
		console.log(err);
	}
}
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { promisify } = require('util');
// const unlinkAsync = promisify(fs.unlink);
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, 'uploads/');
// 	}
// 	, filename: function (req, file, cb) {
// 		cb(null, file.originalname);
// 	}
// });
async function saveImage(files) {
	const fileName = files.profileImage.name;
	const file = files.profileImage;
	console.log(fileName);
	const filePath = path.join(__dirname, '../../uploads/profileImg/' + fileName);
	console.log(filePath);
	file.mv(filePath, (err) => {
		if (err) {
			console.log(err);
		}
	});
	const relativePath = './uploads/profileImg/' + fileName;
	return relativePath;
}
async function uploadImage(req, res) {
	const path = await saveImage(req.files);
	console.log(path);
	try {
		let returnData = await userService.uploadImage(5, path);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function showAllImages(req, res) {
	try {
		let returnData = await userService.showAllImages();
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
router.get('/userData', getUserData);
router.post('/login', loginUser);
router.post('/signup', signUpUser);
// router.post('/login',updatePassword) 
router.post('/forgotpassword1',forgotPassword)
router.post('/forgotpassword2', updatePassword)


router.post('/img/upload', uploadImage);


router.get('/img/show', showAllImages);


module.exports = router;
