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
	// console.log(pdf);
	// console.log(user_id);
	var fileName =
		user_id + '_' + moment().format('YYYYMMDDhhmmss') + '_' + pdf.name;
	// console.log(fileName);
	const filePath = path.join(__dirname, '../../uploads/printDocument/' + fileName);
	// console.log(filePath);
	const file = fs.createWriteStream(filePath);
	const uni8 = new Uint8Array(pdf.data);
	file.write(uni8);
	file.close();
	const relativePath = ('./uploads/printDocument/') + fileName;
	// console.log(file);
	return relativePath;
}
// Upload PDF
async function uploadPdf(req, res) {
	try {
		const pdf = req.files.pdfFile;
		// console.log(pdf.name);
		const user_id = req.body.user_id;
		const selectedDocumentType = req.body.selectedDocumentType;
		const colorMode = req.body.colorMode;
		const range = req.body.range;
		const totalPage = req.body.totalPage;
		const totalCost = req.body.totalCost;
		const path = await savePdf(req.files.pdfFile, user_id);
		const data = {
			user_id: user_id,
			selectedDocumentType: selectedDocumentType,
			colorMode: colorMode,
			range: range,
			totalPage: totalPage,
			totalCost: totalCost,
			path: path,
			pdfName:pdf.name,
		};
		let returndata =await pdfService.uploadDoc(data);
		return res.status(200).json(returndata);
	} catch (err) {
		console.log(err);
	}
}

async function printseller(req, res){

	try {
		let returnData = await pdfService.sellerprint(req);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function docstatusupdate(req,res)
{
	// console.log(req);
	try {
		let returnData = await pdfService.updatedocstatus(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
async function getPdfById(req,res)
{
	// console.log(req);
	try {
		let returnData = await pdfService.getPdfById(req);
		// console.log(returnData)
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}
router.post('/pdf/upload', uploadPdf);
router.get('/pdfList', printseller);
router.post('/docstatusupdate', docstatusupdate);
router.post('/getPdf',getPdfById);
module.exports = router;
