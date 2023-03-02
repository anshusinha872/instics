const express = require('express');
const router = express.Router();
const paymentService = require('../../service/paymentService');
const crypto = require('crypto');
const { json } = require('express');
const { Console } = require('console');

async function paymentDetails(req, res) {
	// console.log(req.body);
	const id = req.body.id;
	const customer_vpa = req.body.customer_vpa;
	const amount = req.body.amount;
	const client_txn_id = req.body.client_txn_id;
	const customer_name = req.body.customer_name;
	const customer_email = req.body.customer_email;
	const customer_mobile = req.body.customer_mobile;
	const p_info = req.body.p_info;
	const upi_txn_id = req.body.upi_txn_id;
	const status = req.body.status;
	const remark = req.body.remark;
	const udf1 = req.body.udf1;
	const udf2 = req.body.udf2;
	const udf3 = req.body.udf3;
	const redirect_url = req.body.redirect_url;
	const txnAt = req.body.txnAt;
	const createdAt = req.body.createdAt;
	let returnData = await paymentService.paymentDetails(req);
	let getPaymentOrderRequestDetails =
		await paymentService.getPaymentOrderRequestDetails(client_txn_id);
	// console.log('getPaymentOrderRequestDetails', getPaymentOrderRequestDetails.data);
	let pdf_id_array = getPaymentOrderRequestDetails.data[0].pdf_id_array;
	// console.log('pdf_id_array', pdf_id_array);
	let data = JSON.parse(pdf_id_array);
	for (let i = 0; i < data.length; i++){
		let pdf_id = data[i];
		console.log('pdf_id', pdf_id);
		let updatePdfDetailsWebhook = await paymentService.updatePdfDetailsWebhook(
			pdf_id,
			status,
			client_txn_id
		);
	}
	let updatePaymentRequest = await paymentService.updatePaymentRequest(
		client_txn_id,
		status
	);
	res.send('Success');
}

router.post('/webhook/upi/status', paymentDetails);
module.exports = router;
