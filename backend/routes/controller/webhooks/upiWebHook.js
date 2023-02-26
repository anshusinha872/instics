const express = require('express');
const router = express.Router();
const paymentService = require('../../service/paymentService');
const crypto = require('crypto');
const { json } = require('express');

async function paymentDetails(req,res) {
	console.log(req.body);
	let returnData = await paymentService.paymentDetails(req);
	console.log(returnData);
	res.send('Success');
}

router.post('/webhook/upi/status', paymentDetails);
module.exports = router;
