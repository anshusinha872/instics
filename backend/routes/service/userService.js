
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

let userData = async (data,fun) => {
	// let data = {
	// 	status: 200,
	// 	message: 'success',
	// 	// "data": results
	// };
	console.log('userData');
	try {
		var connection = config.connection;
		// let qry = `select * from userData`;
		// let queryResult = await connection.query(qry);
		// console.log('queryResult',queryResult.queryResult);
		connection.query('select * from userData',fun);
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
module.exports = {
	userData,
};
