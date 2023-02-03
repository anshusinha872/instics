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
let uploadDoc = async (req) => {
    try {
        const pdf  = req.files.pdfFile;
        const user_id = req.body.user_id;
        const selectedDocumentType = req.body.selectedDocumentType;
        const colorMode = req.body.colorMode;
        const range = req.body.range;
        const totalPage= req.body.totalPage;
        const totalCost = req.body.totalCost;
        return resultdb(200, 'backend');
	} catch (err) {
		(err);
	}
};
module.exports = {
	uploadDoc,
};
