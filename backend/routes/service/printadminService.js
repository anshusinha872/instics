const MysqlPool = require('../../app');
const config = require('../../config/databaseConfig.js');
const util = require('util');
const mysql = require('mysql');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'AnshuSinha';
const resultdb = (statusCode, data = null) => {
	return {
		statusCode: statusCode,
		data: data,
	};
};

let printservice = async (req) => 
{
    try {
        const id=2;
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'select active_status from services where id=?;';

			connection.query(query,[id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
        console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}

let printstatusupdate = async (req) => {
	console.log(req);
	try {
		// console.log(req);
		const laundrystatus = req.body.laundrystatus;
		const laundry_id = req.body.laundry_id;

		var connection = config.connection;
		const response3 = await new Promise((resolve, reject) => {
			const query = 'update services set active_status=? where id=?';
			connection.query(query, [laundrystatus, laundry_id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		console.log('response3', response3);
		return resultdb(200, 'laundrystatus updated sucessfully');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};

let paymenthistory=async(data)=>{
	try {
        const start='P';
		const status='success';
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'select * from paymentRecords WHERE LEFT (client_txn_id, 1) =? && status=? ORDER BY txnAt DESC;;';

			connection.query(query,[start,status], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
        console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}

let totalpayment=async(data)=>{
	try {
        const start='P';
		const status='success';
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'select sum(CAST(amount AS UNSIGNED)) AS totalpayment from paymentRecords WHERE LEFT (client_txn_id, 1) =? && status=?;';

			connection.query(query,[start,status], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
        console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
let calculatepayment=async(req)=>{
	try {
        const startDate=req.body.date1;
        const lastDate=req.body.date2;
		const start='P';
		const status='success';
		
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'select sum(CAST(amount AS UNSIGNED)) AS calculatepayment from paymentRecords WHERE LEFT (client_txn_id, 1) =? && txnAt >= ? AND txnAt <= ?  && status=?;';

			connection.query(query,[start,startDate,lastDate,status], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
        console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
let contactpayment=async(req)=>{
	try {
        const contact=req.body.number;
		const status='success';
		const start='P';
		
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'select sum(CAST(amount AS UNSIGNED)) AS contactpayment from paymentRecords  WHERE LEFT (client_txn_id, 1) =? && customer_mobile=?  && status=?;';

			connection.query(query,[start,contact,status], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
        console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
let successpayment=async(req)=>{
	try {
        const date=req.body.currentdate;
		const status='success';
		const start='P';
		
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'select * from paymentRecords';

			connection.query(query, (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		if(response.length>0){
			let laundryPaymentReport=[];
			for(let i=0;i<response.length;i++){
				console.log(i,response[i].client_txn_id);
			}
		}
        console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
let failurepayment=async(req)=>{
	try {
        const date=req.body.currentdate;
		const status='failure';
		const start='P';
		
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'select * from paymentRecords  WHERE LEFT (client_txn_id, 1) =? && txnAt=?  && status=?;';

			connection.query(query,[start,date,status], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
        console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}

let todayorder=async(req)=>{
	try {
        const date=req.body.currentdate;
		const status='success';
		const start='P';
		
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'select COUNT(*) AS todayorder from paymentRecords  WHERE LEFT (client_txn_id, 1) =? && txnAt=?  && status=?;';

			connection.query(query,[start,date,status], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
        console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
let todaypayment=async(req)=>{
	try {
        const date=req.body.currentdate;
		const status='success';
		const start='P';
		
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'select sum(CAST(amount AS UNSIGNED)) AS todaypayment from paymentRecords  WHERE LEFT (client_txn_id, 1) =? && txnAt=?  && status=?;';

			connection.query(query,[start,date,status], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
        console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}



module.exports = {
printservice,
printstatusupdate,
paymenthistory,
totalpayment,
calculatepayment,
contactpayment,
successpayment, 
failurepayment,
todayorder,
todaypayment,
}