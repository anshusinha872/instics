const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const adminService = require('../service/adminService');
const bcrypt = require('bcrypt');
const path = require('path');
const moment = require('moment');
const fs = require('fs');

async function getsellerstatusupdate(req, res) {
	// console.log(req);
	try {
		let returnData = await adminService.sellertatusupdate(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getsubadminstatusupdate(req, res) {
	// console.log(req);
	try {
		let returnData = await adminService.subadminstatusupdate(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getservicestatusupdate(req, res) {
	// console.log(req);
	try {
		let returnData = await adminService.servicestatusupdate(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function SellerData(req, res) {
	try {
		let returnData = await adminService.getsellerData(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function getuserstatusupdate(req, res) {
	console.log(req);
	try {
		let returnData = await adminService.userstatusupdate(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function deleteuserData(req, res) {
	console.log(req);
	try {
		let returnData = await adminService.deleteuser(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function deletsellerData(req, res) {
	// console.log(req);
	try {
		let returnData = await adminService.deleteseller(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function UserData(req, res) {
	try {
		let returnData = await adminService.getuserData(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function getsellerData(req, res) {
	// console.log(req);
	try {
		let returnData = await adminService.sellerData(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function getuserCount(req, res) {
	try {
		let returnData = await adminService.userCount(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getsellerCount(req, res) {
	try {
		let returnData = await adminService.sellerCount(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getuserCount(req, res) {
	try {
		let returnData = await adminService.userCount(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getAdminData(req, res) {
	try {
		let returnData = await adminService.adminData(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function registersubadmin(req, res) {
	try {
		console.log(req);
		let returnData = await adminService.registersubadmin(req);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function loginadmin(req, res) {
	console.log(req);
	try {
		const username = req.body.username;
		const password = req.body.password;
		var role = req.body.role;
		role = parseInt(role);
		let returnData = await adminService.loginadminByUsername(
			username,
			password,
			role
		);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
		return res.status(200).json(err);
	}
}

async function getsubAdminData(req, res) {
	try {
		let returnData = await adminService.subadminData(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getservices(req, res) {
	try {
		let returnData = await adminService.services(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getsubadminperm(req, res) {
	// console.log(req);
	try {
		let returnData = await adminService.subadminPerm(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getsubAdminData(req, res) {
	try {
		let returnData = await adminService.subadminData(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function addseller(req, res) {
	// console.log(req);
	try {
		let returnData = await adminService.selleradd(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

router.get('/subAdminData', getsubAdminData);
router.post('/adminLogin', loginadmin);
router.post('/registersubadmin', registersubadmin);
router.get('/AdminData', getAdminData);
router.get('/countUser', getuserCount);
router.get('/countSeller', getsellerCount);
router.post('/sellerdata', getsellerData);
router.get('/getuserData', UserData);
router.get('/services', getservices);
router.post('/deleteuserData', deleteuserData);
router.post('/deletesellerData', deletsellerData);
router.post('/userstatusupdate', getuserstatusupdate);
router.post('/sellerstatusupdate', getsellerstatusupdate);
router.post('/subadminstatusupdate', getsubadminstatusupdate);
router.post('/servicestatusupdate', getservicestatusupdate);
router.post('/subadminperm', getsubadminperm);
router.post('/selleradd', addseller);
router.get('/getsellerData', SellerData);
module.exports = router;
