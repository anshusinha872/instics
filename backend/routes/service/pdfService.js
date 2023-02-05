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
let uploadDoc = async (data) => {
	try {
		const docStatus = 0;
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query =
				'INSERT INTO printDocTable (user_id,pdfName,docType,colorMode,printRange,totalPage,totalCost,path,docStatus) VALUES (?,?,?,?,?,?,?,?,?);';
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
module.exports = {
	uploadDoc,
};
