const MysqlPool = require('../../app');
const config = require('../../config/databaseConfig.js');
const util = require('util');
const mysql = require('mysql');
const { time } = require('console');
const resultdb = (statusCode, data = null) => {
	return {
		statusCode: statusCode,
		data: data,
	};
};
let uploadDoc = async (data) => {
	try {
		const docStatus = 0;
		var today = new Date();
		var hrs= today.getHours();
		var sec = today.getMinutes();
		var time = hrs + ":" + sec ;
		var tableName = "printDocTable";
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
		
			const query =
				"INSERT INTO " + tableName+ " (user_id,pdfName,docType,colorMode,printRange,totalPage,totalCost,path,docStatus,date,time,sellerId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";
			console.log(query);
				connection.query(
				query,
				[
					parseInt(data.user_id),
					data.pdfName,
					parseInt(data.selectedDocumentType),
					parseInt(data.colorMode),
					data.range,
					parseInt(data.totalPage),
					parseInt(data.totalCost),
					data.path,
					docStatus,
					today,
					time,
					parseInt(data.sellerId),
				],
				(err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				}
			);
		});
		return resultdb(200, 'Added to Cart');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
let sellerprint = async (data) => {
	console.log('userData');
	console.log(data.body);
	const sellerId = data.body.sellerId;
	
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = "select * from printDocTable where sellerId= ?;";

			connection.query(query, [sellerId],(err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});

		if (response.length > 0) {
			let returnData = [];
			for (let i = 0; i < response.length; i++) {
				let item = response[i];
				// console.log('item',item);
				// console.log('item date', item.date);
				let resData = {
					id: item.id,
					user_id: item.user_id,
					pdfName: item.pdfName,
					docType: item.docType,
					colorMode: item.colorMode,
					printRange: item.printRange,
					totalPage: item.totalPage,
					totalCost: item.totalCost,
					docStatus: item.docStatus,
					payment_status:item.payment_status,
					// pdf: await convertPdf(item.path),
					pdfPresent:await isPdfAvailable(item.path),
					// image: await convertImage(item.filePath),
					date: item.date,
					time: item.time,
					sellerId: item.sellerId,
				};

				if (resData.pdfPresent == true) {
					returnData.push(resData);
				}
			}

			// console.log(data);
			return resultdb(200, returnData);
		}

		// return response;
	} catch (err) {
		// console.log('93', err);
		return resultdb(500, err);
	}
};

let isPdfAvailable = async (pdf) => {
	return new Promise((resolve, reject) => {
		const fs = require('fs');
		fs.access(pdf, fs.constants.F_OK, (err) => {
			if (err) {
				// console.error('no access!');
				resolve(false);
			} else {
				// console.log('can read/write');
				resolve(true);
			}
		});
	});
};
let convertPdf = async (pdf) => {
	return new Promise((resolve, reject) => {
		const fs = require('fs');
		fs.access(pdf, fs.constants.F_OK, (err) => {
			if (err) {
				console.error('no access!');
				resolve(null);
			} else {
				console.log('can read/write');
				fs.readFile(pdf, function (err, content) {
					if (err) {
						reject('error');
					} else {
						let bitmap = fs.readFileSync(pdf);
						let base64 = new Buffer(bitmap).toString('base64');
						resolve(base64);
					}
				});
			}
		});
	});
};
let updatedocstatus = async (req) => {
	console.log(req.body);
	try {
		const docStatus = req.body.docstatus;
		const id = req.body.id;
		// console.log(docStatus);
		var connection = config.connection;
		const response3 = await new Promise((resolve, reject) => {
			const query = "update printDocTableset docStatus=? where id=?";
			connection.query(query, [docStatus, id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log('response3', response3);
		return resultdb(200, 'docStatus updated sucessfully');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
let getPdfById = async (req) => {
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = "select * from printDocTable WHERE id = ?;";
			connection.query(query,[req.body.id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		const path = response[0].path;
		return await convertPdf(path);
	} catch (err) {
		return resultdb(404, err);
	}
}
let getUserPDF = async (data) => {
	// console.log('userData');
	console.log(data);
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query =
				"select * from printDocTable WHERE user_id = ? ORDER BY id DESC;";

			connection.query(query,[data], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});

		if (response.length > 0) {
			let returnData = [];
			for (let i = 0; i < response.length; i++) {
				let item = response[i];
				// console.log('item', item);
				let resData = {
					id: item.id,
					user_id: item.user_id,
					pdfName: item.pdfName,
					docType: item.docType,
					colorMode: item.colorMode,
					printRange: item.printRange,
					totalPage: item.totalPage,
					totalCost: item.totalCost,
					docStatus: item.docStatus,
					payment_status: item.payment_status,
					// pdf: await convertPdf(item.path),
					pdfPresent: await isPdfAvailable(item.path),
					// image: await convertImage(item.filePath),
					date : item.date,
					time : item.time,
					sellerId: sellerId,
				};

				if (resData.pdfPresent == true) {
					returnData.push(resData);
				}
			}

			// console.log(data);
			return resultdb(200, returnData);
		}

		// return response;
	} catch (err) {
		// console.log('93', err);
		return resultdb(500, err);
	}
};
let loginsellerByUsername = async (username, password) => {
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from seller WHERE username = ?;';
			connection.query(query, [username], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});

		if (response.length > 0) {
			console.log(response[0].password);
			if (response[0].password == password) {
				return resultdb(200, 'login sucess');
			} else {
				return resultdb(400, 'Login Failed');
			}
		}
		return resultdb(400, 'Login Failed');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};

module.exports = {
	uploadDoc,
	sellerprint,
	convertPdf,
	updatedocstatus,
	getPdfById,
	getUserPDF,
	loginsellerByUsername,
};
