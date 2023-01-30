const MysqlPool = require('../../app');
const config = require('../../config/databaseConfig.js');
const util = require('util');
const mysql = require('mysql');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "AnshuSinha";
const resultdb = (statusCode, data = null) => {
	return {
		statusCode: statusCode,
		data: data,
	};
};
let convertImage = async (img) => {
	return new Promise((resolve, reject) => {
		const fs = require('fs');
		fs.access(img, fs.constants.F_OK, (err) => {
			if (err) {
				console.error('no access!');
				resolve(null);
			} else {
				console.log('can read/write');
				fs.readFile(img, function (err, content) {
					if (err) {
						reject('error');
					} else {
						let bitmap = fs.readFileSync(img);
						let base64 = new Buffer(bitmap).toString('base64');
						resolve(base64);
					}
				});
			}
		});
	});
};
let showAllImages = async (req) => {
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from imageRecord;';
			connection.query(query, (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		console.log(response);
		if (response.length > 0) {
			let returnData = [];
			for (let i = 0; i < response.length; i++) {
				let item = response[i];
				let resData = {
					user_id: item.user_id,
					image: await convertImage(item.filePath),
				};
				returnData.push(resData);
			}
			let item = {
				data: returnData,
			};
			return resultdb(200, item);
		}
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
let getUserDetailsById = async (req) => {
	const user_id = parseInt(req.decoded.user_id);
	// console.log(req.decoded.user_id);
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from userData WHERE user_id = ?;';
			connection.query(query, [user_id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log(response);
		if (response.length > 0) {
			let item = response[0];
			let resData = {
				user_id: item.user_id,
				firstName: item.firstName,
				lastName: item.lastName,
				email_id: item.email_id,
				contact: item.contact,
				profileImage: await convertImage(item.profile_image),
			};
			// console.log(resData);
			let item1 = {
				data: resData,
			};
			return resultdb(200, item1);
		}
		else {
			return resultdb(404, 'User not found');
		}
	}
	catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
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
let loginUserByEmailId = async (email_id, password) => {
	var isPasswordMatch = false;
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from userData WHERE email_id = ?;';
			connection.query(query, [email_id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		if (response.length > 0) {
			let isValidPassword = bcrypt.compareSync(password, response[0].password);
			if (isValidPassword) {
				let userData = {
					user_id: response[0].user_id,
					email_id: response[0].email_id,
				}
				// console.log(userData);
				// JWT Token
				let token = jwt.sign(userData,secretKey, {
					expiresIn: 300, // expires in 5min
				});
				let returnData = {
					user_id: response[0].user_id,
					email_id: response[0].email_id,
					token: token,
				}
				return resultdb(200, returnData);
			}
			else {
				return resultdb(400, 'Invalid Password');
			}
		}
		else {
			return resultdb(400, 'Invalid Email Id');
		}
		return resultdb(400, 'Login Failed');
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
		let genSalt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		let hash = await bcrypt.hash(password, genSalt);
		// console.log(hash);
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
		} else {
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
			} else {
				const response2 = await new Promise((resolve, reject) => {
					const query =
						'INSERT INTO userData (email_id, password, firstName, lastName, contact) VALUES (?,?,?,?,?);';
					connection.query(
						query,
						[email, hash, firstName, lastName, contact],
						(err, results) => {
							if (err) reject(new Error(err.message));
							resolve(results);
						}
					);
				});
				console.log('response2', response2);
				return resultdb(200, 'User created successfully');
			}
		}
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};

let forgotPassword = async (contact) => {
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from userData WHERE contact = ?;';
			connection.query(query, [contact], (err, results) => {
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
let uploadImage = async (user_id,file_path) => {
	try {
		var connection = config.connection;
		const checkIfImageExist = await new Promise((resolve, reject) => {
			const query = 'SELECT * FROM userData WHERE user_id = ?;';
			connection.query(query, [user_id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		if (checkIfImageExist.length > 0) {
			const response = await new Promise((resolve, reject) => {
				const query =
					'UPDATE userData SET profile_image = ? WHERE user_id = ?;';
				connection.query(query, [file_path, user_id], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return resultdb(200, 'Image updated successfully');
		}
		else {
			const response = await new Promise((resolve, reject) => {
				const query =
					'INSERT INTO userData (user_id, profile_image) VALUES (?,?);';
				connection.query(query, [user_id, file_path], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return resultdb(200, 'Image uploaded successfully');
		}
	}
	catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
let updatePassword = async (req) => {
	try {
		var contact = req.body.contact;
		contact = parseInt(contact);
		const password = req.body.password;
		console.log(contact);
		console.log(password);

		let genSalt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		let hash = await bcrypt.hash(password, genSalt);
		console.log(hash);
		var connection = config.connection;
		const response3 = await new Promise((resolve, reject) => {
			const query = 'update userData set password=? where contact=?';
			connection.query(query, [hash, contact], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		console.log('response3', response3);
		return resultdb(200, 'password updated sucessfully');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
module.exports = {
	userData,
	loginUserByEmailId,
	signUpUser,
	forgotPassword,
	updatePassword,
	uploadImage,
	showAllImages,
	getUserDetailsById,
};
