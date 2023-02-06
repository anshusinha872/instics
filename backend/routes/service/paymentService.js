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

let successPayment = async (data) => {
	let value = JSON.parse(data.rawBody);
	const order_id = value.data.order.order_id;
	const order_amount = value.data.order.order_amount;
	const payment_status = value.data.payment.payment_status;
	const cf_payment_id = value.data.payment.cf_payment_id;
	const upi_id = value.data.payment.payment_method.upi.upi_id;
	const customer_name = value.data.customer_details.customer_name;
	const customer_id = value.data.customer_details.customer_id;
	const customer_email = value.data.customer_details.customer_email;
	const customer_phone = value.data.customer_details.customer_phone;
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query =
				'INSERT INTO paymentRecord (orderId,customer_id,cf_payment_id,amount,upi_id,payment_status,customer_name,customer_email,customer_phone) VALUES (?,?,?,?,?,?,?,?,?) ;';
			connection.query(
				query,
				[
					order_id,
					customer_id,
					cf_payment_id,
					order_amount,
					upi_id,
					payment_status,
					customer_name,
					customer_email,
					customer_phone,
				],
				(err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				}
			);
        });
		return resultdb(200, response);
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
module.exports = {
	successPayment,
};
