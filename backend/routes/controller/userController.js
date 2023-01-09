const express = require('express');
const MysqlPool = require('../../db/index.js');
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
router.get('/userData', getUserData);
module.exports = router;
