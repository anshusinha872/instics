const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const printadmin = require('../service/printadminService');
const bcrypt = require('bcrypt');
const path = require('path');
const moment = require('moment');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const secretKey = 'AnshuSinha';


async function getprintservices(req, res) {
	try {
		let returnData = await printadmin.printservice(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function getprintstatusupdate(req, res) {
	// console.log(req);
	try {
		let returnData = await printadmin.printstatusupdate(req);
		console.log(returnData);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function getpaymenthistory(req, res) {
	try {
		let returnData = await printadmin.paymenthistory(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function gettotalpayment(req, res) {
	try {
		let returnData = await printadmin.totalpayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getcalculatedamount(req, res) {
	try {
		let returnData = await printadmin.calculatepayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getcontactamount(req, res) {
	try {
		let returnData = await printadmin.contactpayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getcalculatedamount(req, res) {
	try {
		let returnData = await printadmin.calculatepayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getsuccessamount(req, res) {
	try {
		let returnData = await printadmin.successpayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getfailamount(req, res) {
	try {
		let returnData = await printadmin.failurepayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function gettodayorder(req, res) {
	try {
		let returnData = await printadmin.todayorder(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function gettodaypayment(req, res) {
	try {
		let returnData = await printadmin.todaypayment(req);
		console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

router.get('/print/printservicestatus', getprintservices);
router.get('/print/paymenthistory', getpaymenthistory);
router.get('/print/totalpayment', gettotalpayment);
router.post('/print/printstatusupdate',getprintstatusupdate);
router.post('/print/calculateamount',getcalculatedamount);
router.post('/print/contactamount',getcontactamount);
router.post('/print/successamount',getsuccessamount);
router.post('/print/failamount',getfailamount);
router.post('/print/todayorder',gettodayorder);
router.post('/print/reporttotalpayment',gettodaypayment);

module.exports = router;