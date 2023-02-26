const MysqlPool = require('../../app');
const config = require('../../config/databaseConfig.js');
const util = require('util');
const mysql = require('mysql');
const resultdb = (statusCode, data = null) => {
	return {
		statusCode: statusCode,
		data: data,
	};
};
let paymentDetails = async (req) => {
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
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query =
				'INSERT INTO payment_records (id,customer_vpa,amount,customer_name,customer_email,customer_mobile,p_info,upi_txn_id,status,remark,udf1,udf2,udf3,redirect_url,txnAt,createdAt,client_txn_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ;';
			connection.query(
				query,
				[
					id,
					customer_vpa,
					amount,
					customer_name,
					customer_email,
					customer_mobile,
					p_info,
					upi_txn_id,
					status,
					remark,
					udf1,
					udf2,
					udf3,
					redirect_url,
					txnAt,
					createdAt,
					client_txn_id,
				],
				(err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				}
			);
		});
		console.log(response);
		return resultdb(200, response);
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
let recordPaymentRequest = async (data1, data2,user_id) => {
	// console.log('data1', data1);
	data2 = JSON.parse(data2);
	// console.log('data2', data2);
	const client_txn_id = data2.client_txn_id;
	const amount = data2.amount;
	const p_info = data2.p_info;
	const customer_name = data2.customer_name;
	const customer_email = data2.customer_email;
	const customer_mobile = data2.customer_mobile;
	const redirect_url = data2.redirect_url;
	const udf1 = data2.udf1;
	const udf2 = data2.udf2;
	const udf3 = data2.udf3;
	const order_id = data1.data.order_id;
	const payment_url = data1.data.payment_url;
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query =
				'INSERT INTO payment_order_request (client_txn_id,amount,p_info,customer_name,customer_email,customer_mobile,redirect_url,udf1,udf2,udf3,order_id,payment_url,user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) ;';
			connection.query(
				query,
				[
					client_txn_id,
					amount,
					p_info,
					customer_name,
					customer_email,
					customer_mobile,
					redirect_url,
					udf1,
					udf2,
					udf3,
					order_id,
					payment_url,
					user_id,
				],
				(err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				}
			);
		});
		console.log(response);
		return resultdb(200, response);
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
module.exports = {
	paymentDetails,
	recordPaymentRequest,
};
