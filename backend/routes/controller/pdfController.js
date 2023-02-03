const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const pdfService = require('../service/pdfService');
const bcrypt = require('bcrypt');
const path = require('path');
const moment = require('moment');
const fs = require('fs');
// save pdf to directory
async function savePdf(pdf, user_id) {
	console.log(pdf);
	console.log(user_id);
	var fileName =
		user_id + '_' + moment().format('YYYYMMDDhhmmss') + '_' + pdf.name;
	// console.log(fileName);
	const filePath = path.join(__dirname, '../../uploads/printDocument/' + fileName);
	// console.log(filePath);
	const file = fs.createWriteStream(filePath);
	const uni8 = new Uint8Array(pdf.data);
	file.write(uni8);
	file.close();
	// console.log(file);
}
// Upload PDF
async function uploadPdf(req, res) {
	try {
		const pdf = req.files.pdfFile;
		const user_id = req.body.user_id;
		const selectedDocumentType = req.body.selectedDocumentType;
		const colorMode = req.body.colorMode;
		const range = req.body.range;
		const totalPage = req.body.totalPage;
		const totalCost = req.body.totalCost;
		// console.log(pdf);
		// console.log(user_id);
		// console.log(selectedDocumentType);
		// console.log(colorMode);
		// console.log(range);
		// console.log(totalPage);
		// console.log(totalCost);
		savePdf(req.files.pdfFile,user_id);
		// const path = await savePdf(req.body);
		// let returnData = await pdfService.uploadDoc(req);
		// console.log(returnData);
		return res.status(200).json('added to cart');
	} catch (err) {
		console.log(err);
	}
}
router.post('/pdf/upload', uploadPdf);
module.exports = router;
