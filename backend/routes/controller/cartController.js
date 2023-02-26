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
	console.log(req.body.amount);
	const num = req.body.amount;
	let amount = num.toString();

	const user_id = req.body.user_id;
	console.log(user_id);
	let userdata = await userService.userDataByUserId(user_id);
	console.log(userdata.data[0]);
	let order_id = await cartService.orderId();
	console.log(order_id);
	var axios = require('axios');
	// console.log(req.body.amount);
	// console.log(userdata);
	var data = JSON.stringify({
		key: secretKey,
		client_txn_id: order_id.data,
		amount: '1',
		p_info: req.body.p_info,
		customer_name: userdata.data[0].firstName + ' ' + userdata.data[0].lastName,
		customer_email: userdata.data[0].email_id,
		customer_mobile: userdata.data[0].contact.toString(),
		redirect_url: 'https://instincts.co.in/home',
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
			// sessionStorage.setItem('client_txn_id', order_id.data);
			let response_data = [];
			response_data.push(response.data);
			let newData = JSON.parse(data);
			// console.log(newData);
			response_data.push(newData);
			response_data.push(user_id);
			paymentService.recordPaymentRequest(response.data,data,user_id);
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
router.post('/cart/view', getCartItems);
router.post('/cart/createOrder', createOrder);
// router.post('/cart/orderPay', orderPay);
router.post('/cart/delete',deletePDFItem);
module.exports = router;
