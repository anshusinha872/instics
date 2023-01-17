
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
let signUpUser = async (req) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		var contact = req.body.contact;
		contact = parseInt(contact);
		// console.log(contact);
		// console.log(email);
		// console.log(10);
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'SELECT * FROM userData WHERE email_id = ?;';
			connection.query(query, [email], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log('response', response);
		if (response.length > 0) {
			return resultdb(303, 'Email already exist');
		}
		else {
			// console.log('else');
			const response1 = await new Promise((resolve, reject) => {
				const query = 'SELECT * FROM userData WHERE contact = ?;';
				connection.query(query, [contact], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			if (response1.length > 0) {
				return resultdb(303, 'Phone number already exist');
			}
			else {
				const response2 = await new Promise((resolve, reject) => {
					const query = 'INSERT INTO userData (email_id, password, firstName, lastName, contact) VALUES (?,?,?,?,?);';
					connection.query(query, [email, password, firstName, lastName, contact], (err, results) => {
						if (err) reject(new Error(err.message));
						resolve(results);
					});
				});
				console.log('response2', response2);
				return resultdb(200, 'User created successfully');
			}
		}
	}
	catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
module.exports = {
	userData,
	loginUserByEmailId,
	signUpUser,
};
