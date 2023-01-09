const express = require('express');
const MysqlPool = require('../../db/index.js');
const router = express.Router();
const userService = require('../service/userService');
async function getUserData(req, res) {
	try {
		console.log('getUserData');
		let returnData = await userService.userData(req, function (error, results) {
			if (results) {
				console.log(results);
				return res.status(200).json(results);
			} else {
				console.log(error);
			}
		});
	} catch (err) {
		console.log(err);
	}

}
router.get('/userData', getUserData);
module.exports = router;
