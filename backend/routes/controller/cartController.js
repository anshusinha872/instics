const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const cartService = require('../service/cartService');
// const sdk = require('api')('@instamojo/v2#ulug320lc4eyadv');
const axios = require('axios');
const { URLSearchParams } = require('url');
const userService = require('../service/userService');
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
	// console.log(req.body);
	const user_id = req.body.user_id;
	// console.log(user_id);
	let userdata = await userService.userDataByUserId(user_id);
	const customer_id = 'A01'+user_id
	const customer_name = userdata.data[0].firstName + ' ' + userdata.data[0].lastName
	const customer_email = userdata.data[0].email_id;
	const customer_phone = userdata.data[0].contact.toString();
	// console.log(customer_id);
	// console.log(customer_name);
	// console.log(customer_email);
	// console.log(customer_phone);

	// console.log(userName);
	// return res.status(200).json('success');
	const options = {
		method: 'POST',
		url: 'https://sandbox.cashfree.com/pg/orders',
		headers: {
			accept: 'application/json',
			'x-client-id': '31273553dadb9b01741c28a284537213',
			'x-client-secret': 'b1dc62b7fea288402f7b49407606aaa19e4d719d',
			'x-api-version': '2022-09-01',
			'content-type': 'application/json',
		},
		data: {
			customer_details: {
				customer_name:customer_name,
				customer_id: customer_id,
				customer_email: customer_email,
				customer_phone: customer_phone,
			},
			order_amount: 100,
			order_currency: 'INR',
			order_id: 'PO009',
		},
	};

	axios
		.request(options)
		.then(function (response) {
			console.log(response.data);
			return res.status(200).json(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
}
async function createPaymentRequest(req, res) {
	const encodedParams = new URLSearchParams();
	encodedParams.set('allow_repeated_payments', 'false');
	encodedParams.set('send_email', 'false');
	encodedParams.set('amount', '100');
	encodedParams.set('purpose', 'print');

	const options = {
		method: 'POST',
		url: 'https://test.instamojo.com/v2/payment_requests/',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer {{JINhI9dVQQl5yJd77xatNlcwvedxH-di1Koi061g140.DKI-jZ9Wcni4eTbz9Lu3YQzdBVj20nrBZakU91UtX0w}}',
			'content-type': 'application/x-www-form-urlencoded',
		},
		data: encodedParams,
	};

	axios
		.request(options)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
}
router.post('/cart/view', getCartItems);
router.post('/cart/createOrder', createOrder);
router.post('/cart/createPaymentRequest', createPaymentRequest);
module.exports = router;
