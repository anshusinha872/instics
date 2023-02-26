const MysqlPool = require('../../app');
const config = require('../../config/databaseConfig.js');
const util = require('util');
const mysql = require('mysql');
const pdfService = require('./pdfService');
const resultdb = (statusCode, data = null) => {
	return {
		statusCode: statusCode,
		data: data,
	};
};

let getCartItems = async (user_id) => {
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query =
				'SELECT * FROM printDocTable WHERE user_id = ? AND docStatus = ?;';
			connection.query(query, [user_id, 0], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		if (response.length > 0) {
			let returnData = [];
			// console.log(response);
			for (let i = 0; i < response.length; i++) {
				let data = {
					id: response[i].id,
					pdfName: response[i].pdfName,
					docType: response[i].docType,
					colorMode: response[i].colorMode,
					totalPage: response[i].totalPage,
					totalCost: response[i].totalCost,
					docStatus: response[i].docStatus,
				};
				returnData.push(data);
			}
			return resultdb(200, returnData);
		} else {
			return resultdb(404, 'Nothing to display');
		}
		return resultdb(200, response);
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
let orderId = async () => {
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = 'SELECT * FROM payment_order_request;';
			connection.query(query, (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		let orderId = 1000 + response.length + 1;
		orderId = 'PS' + orderId;
		console.log(orderId);
		return resultdb(200, orderId);
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
let deletePDFItem = async (user_id, pdf_id) => {
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			
			const query = 'DELETE FROM printDocTable WHERE user_id = ? AND id = ?;';
			connection.query(query,[user_id,pdf_id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
			
		});
		return resultdb(200, response);
	}
	catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
module.exports = {
	getCartItems,
	orderId,
	deletePDFItem,
};
