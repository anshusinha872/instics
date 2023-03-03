const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const cartService = require('../service/cartService');
const paymentService = require('../service/paymentService');
// const sdk = require('api')('@instamojo/v2#ulug320lc4eyadv');
const axios = require('axios');
const { URLSearchParams } = require('url');
const userService = require('../service/userService');
const { json } = require('express');
const secretKey = '1bd690fe-89eb-4d8a-87a3-1b8af4107506';
// Get order history
async function getCartItems(req, res) {
	try {
		const user_id = req.body.user_id;
		let returndata = await cartService.getCartItems(user_id);
		return res.status(200).json(returndata);
	} catch (err) {
		console.log(err);
	}
}
async function createOrder(req, res) {
	// console.log(req.body.amount);
	const num = req.body.amount;
	let amount = num.toString();
	// console.log('here', req.body.pdf_id);
	let pdf_id = JSON.stringify(req.body.pdf_id);
	// console.log('here2',pdf_id);
	const user_id = req.body.user_id;
	// console.log(user_id);
	let userdata = await userService.userDataByUserId(user_id);
	// console.log(userdata.data[0]);
	let order_id = await cartService.orderId();
	// console.log(order_id);
	var axios = require('axios');
	// console.log(req.body.amount);
	// console.log(userdata);
	var data = JSON.stringify({
		key: secretKey,
		client_txn_id: order_id.data,
		amount: amount,
		p_info: req.body.p_info,
		customer_name: userdata.data[0].firstName + ' ' + userdata.data[0].lastName,
		customer_email: userdata.data[0].email_id,
		customer_mobile: userdata.data[0].contact.toString(),
		redirect_url: 'https://instincts.co.in/dashboard/paymentVerification',
	});
	console.log(data);
	var config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://merchant.upigateway.com/api/create_order',
		headers: {
			'Content-Type': 'application/json',
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
			let response_data = [];
			response_data.push(response.data);
			let newData = JSON.parse(data);
			response_data.push(newData);
			response_data.push(user_id);
			paymentService.recordPaymentRequest(
				response.data,
				data,
				user_id,
				pdf_id
			);
			return res.status(200).json(response_data);

		})
		.catch(function (error) {
			console.log(error);
		});
}
async function deletePDFItem(req, res) {
	try {
		const user_id = req.body.user_id;
		const pdf_id = req.body.item_id;
		// console.log(user_id);
		// console.log(pdf_id);
		let returndata = await cartService.deletePDFItem(user_id, pdf_id);
		return res.status(200).json(returndata);
	} catch (err) {
		console.log(err);
	}
}
async function checkPaymentStatus(req, res) {
	let status = 'pending';
	try {
		const txn_date = req.body.txn_date;
		const client_txn_id = req.body.client_txn_id;
		const pdf_id = req.body.pdf_id;
		const user_id = req.body.user_id;
		var axios = require('axios');
		var data = JSON.stringify({
			key: secretKey,
			client_txn_id: client_txn_id,
			txn_date: txn_date,
		});

		var config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'https://merchant.upigateway.com/api/check_order_status',
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				console.log('response', response.data.data);
				if (response.data.data.status == 'success') {
					let updatePdfPaymentResponse =paymentService.updatePdfPaymentStatus(
						user_id,
						pdf_id,
						client_txn_id,
						'success'
					);
					let updatePaymentRequest = paymentService.updatePaymentRequest(
						client_txn_id,
						'success'
					);
					return res.status(200).json(response.data);
				}
				else {
					let updatePdfPaymentResponse = paymentService.updatePdfPaymentStatus(
						user_id,
						pdf_id,
						client_txn_id,
						'failure'
					);
					let updatePaymentRequest = paymentService.updatePaymentRequest(
						client_txn_id,
						'failure'
					);
					return res.status(200).json(response.data.data);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	} catch (err) {
		console.log(err);
	}
}
async function getPaymentHistory(req, res) {
	try {
		const user_id = req.body.user_id;
		let returndata = await paymentService.getPaymentHistory(user_id);
		return res.status(200).json(returndata);
	} catch (err) {
		console.log(err);
	}
}
router.post('/cart/view', getCartItems);
router.post('/cart/createOrder', createOrder);
// router.post('/cart/orderPay', orderPay);
router.post('/cart/delete', deletePDFItem);
router.post('/cart/checkPaymentStatus', checkPaymentStatus);
router.post('/getPaymentHistory',getPaymentHistory);
module.exports = router;
