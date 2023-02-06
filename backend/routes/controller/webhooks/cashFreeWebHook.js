const express = require('express');
const router = express.Router();
const paymentService = require('../../service/paymentService');
const crypto = require('crypto');

async function successPayment(req, res) {
	// console.log(req.rawBody);
	const ts = req.headers['x-webhook-timestamp'];
	const signature = req.headers['x-webhook-signature'];
	const currTs = Math.floor(new Date().getTime() / 1000);
	if (currTs - ts > 30000) {
		res.send('Failed');
	}
	genSign = verify(ts, req.rawBody);
	matched = genSign === signature;
	console.log(genSign, signature, matched);
    if (matched == true) {
        // console.log('Success');
        let returnData = await paymentService.successPayment(req);
    }
}
function verify(ts, rawBody) {
	const body = ts + rawBody;
	const secretKey = 'b1dc62b7fea288402f7b49407606aaa19e4d719d';
	let genSignature = crypto
		.createHmac('sha256', secretKey)
		.update(body)
		.digest('base64');
	return genSignature;
}
router.post('/webHook/cashFree/success', successPayment);
module.exports = router;
