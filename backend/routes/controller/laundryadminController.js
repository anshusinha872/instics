const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const laundryadmin = require('../service/laundryadminService');
const bcrypt = require('bcrypt');
const path = require('path');
const moment = require('moment');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const secretKey = 'AnshuSinha';


async function getlaundryservices(req, res) {
	try {
		let returnData = await laundryadmin.laundryservice(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function getlaundrystatusupdate(req, res) {
	// console.log(req);
	try {
		let returnData = await laundryadmin.laundrystatusupdate(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function getpaymenthistory(req, res) {
	try {
		let returnData = await laundryadmin.paymenthistory(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function gettotalpayment(req, res) {
	try {
		let returnData = await laundryadmin.totalpayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getcalculatedamount(req, res) {
	try {
		let returnData = await laundryadmin.calculatepayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getcontactamount(req, res) {
	try {
		let returnData = await laundryadmin.contactpayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getcalculatedamount(req, res) {
	try {
		let returnData = await laundryadmin.calculatepayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getsuccessamount(req, res) {
	try {
		let returnData = await laundryadmin.successpayment(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getfailamount(req, res) {
	try {
		let returnData = await laundryadmin.failurepayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function gettodayorder(req, res) {
	try {
		let returnData = await laundryadmin.todayorder(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function gettodaypayment(req, res) {
	try {
		let returnData = await laundryadmin.todaypayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

router.get('/laundryservicestatus', getlaundryservices);
router.get('/paymenthistory', getpaymenthistory);
router.get('/totalpayment', gettotalpayment);
router.post('/laundrystatusupdate',getlaundrystatusupdate);
router.post('/calculateamount',getcalculatedamount);
router.post('/contactamount',getcontactamount);
router.post('/successamount',getsuccessamount);
// router.post('/failamount',getfailamount);
// router.post('/todayorder',gettodayorder);
// router.post('/reporttotalpayment',gettodaypayment);

module.exports = router;