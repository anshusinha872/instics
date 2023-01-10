
const MysqlPool = require('../../db/index.js');
const config = require('../../config/databaseConfig.js');
const util = require('util');
const mysql = require('mysql');

const resultdb = (statusCode, data = null) => {
	return {
		statusCode: statusCode,
		data: data,
	};
};

let userData = async (data) => {
	// console.log('userData');
	try {
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from userData;';

			connection.query(query, (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log('response', response);
		// console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
let loginUserByEmailId = async (email_id) => {
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from userData WHERE email_id = ?;';
			connection.query(query, [email_id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
module.exports = {
	userData,
	loginUserByEmailId,
};
