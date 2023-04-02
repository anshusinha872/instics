const { json } = require('express');
const express = require('express');
const router = express.Router();
const laundryService = require('../service/laundryService');
const { route } = require('./userController');
async function addServiceName(req, res) {
	try {
		const sectionName = req.body.name;
		let returnData = await laundryService.addServiceName(sectionName);
		return res.status(200).json(returnData);
	} catch (err) {
		console.log(err);
	}
}

async function showClothSection(req,res){
	try{
		console.log('req');
		let returnData = await laundryService.showClothSection();
		return res.status(200).json(returnData);
	}
	catch(err){
		console.log(err);
	}
}
async function addClothType(req,res){
	try{
		// console.log('req');
		let returnData = await laundryService.addClothType(req.body);
		return res.status(200).json(returnData);
	}
	catch(err){
		console.log(err);
	}
}
async function showClothType(req,res){
	try{
		// console.log('req');
		let returnData = await laundryService.showClothType(req.body);
		return res.status(200).json(returnData);
	}
	catch(err){
		console.log(err);
	}
}
async function deleteSection(req,res){
	try{
		// console.log('req');
		// console.log('deletesection',req.body.id);
		let returnData = await laundryService.deleteSection(req.body.id);
		return res.status(200).json(returnData);
	}
	catch(err){
		console.log(err);
	}
}
async function deleteClothType(req,res){
	try{
		console.log('req',req.body.id);
			// console.log('deletesection',req.body.id);
		let returnData = await laundryService.deleteClothType(req.body.id);
		return res.status(200).json(returnData);
	}
	catch(err){
		console.log(err);
	}
}
async function placeLaundryOrder(req,res){
	try{
		console.log('req',req.body);
		let returnData = await laundryService.placeLaundryOrder(req.body);
		return res.status(200).json(returnData);
	}
	catch(err){
		console.log(err);
	}
}
async function getOrderDetailsByUserId(req,res){
	try{
		console.log('req',req.body);
		let returnData = await laundryService.getOrderDetailsByUserId(req.body.user_id);
		return res.status(200).json(returnData);
	}
	catch(err){
		console.log(err);
	}
}
router.post('/laundry/addServiceName', addServiceName);
router.get('/laundry/showSection',showClothSection);
router.post('/laundry/addClothType',addClothType);
router.get('/laundry/showAllClothType',showClothType);
router.post('/laundry/deleteSection',deleteSection);
router.post('/laundry/deleteClothType',deleteClothType);
router.post('/laundry/placeOrder',placeLaundryOrder);
router.post('/laundry/getOrderDetails',getOrderDetailsByUserId);
module.exports = router;
