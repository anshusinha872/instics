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

let sellertatusupdate = async (req) => {
	try {
		console.log(req);
		const sellerstatus = req.body.sellerstatus;
		const seller_id = req.body.seller_id;
		

		
		var connection = config.connection;
		const response3 = await new Promise((resolve, reject) => {
			const query = 'update seller set seller_status=? where id_seller=?';
			connection.query(query, [sellerstatus,seller_id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		console.log('response3', response3);
		return resultdb(200, 'seller activestatus updated sucessfully');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};


let getsellerData = async (data) => {
	// console.log('userData');
	try {
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from seller;';

			connection.query(query, (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log('response', response);
		// console.log(response);
		// return resultdb(200, 'user deleted successfully');
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
let userstatusupdate = async (req) => {
	try {
		console.log(req);
		const userstatus = req.body.userstatus;
		const user_id = req.body.user_id;
		

		
		var connection = config.connection;
		const response3 = await new Promise((resolve, reject) => {
			const query = 'update userData set active_status=? where user_id=?';
			connection.query(query, [userstatus,user_id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		console.log('response3', response3);
		return resultdb(200, 'user activestatus updated sucessfully');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
let subadminstatusupdate = async (req) => {
    console.log(req)
	try {
		console.log(req);
		const subadminstatus = req.body.subadminstatus;
		const deleteperm = req.body.deleteperm;
		const createperm = req.body.createperm;
		const subadmin_id = req.body.subadmin_id;
		

		
		var connection = config.connection;
		const response3 = await new Promise((resolve, reject) => {
			const query = 'update subadmin set active_status=?,deleteseller_perm=?,createseller_perm=? where id_subadmin=?';
			connection.query(query, [subadminstatus,deleteperm,createperm,subadmin_id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		console.log('response3', response3);
		return resultdb(200, 'subadmin permission updated sucessfully');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};

let deleteuser = async (data) => {
	// console.log('userData');
	
	try {
		const id=data.body.user_id;
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'delete from userData where user_id=?';

			connection.query(query,[id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log('response', response);
		// console.log(response);
		return resultdb(200, 'user deleted successfully');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
let deleteseller = async (data) => {
	// console.log('userData');
	
	try {
		const id=data.body.id_seller;
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'delete from seller where id_seller=?';

			connection.query(query,[id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log('response', response);
		// console.log(response);
		return resultdb(200, 'seller deleted successfully');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
let getuserData = async (data) => {
	// console.log('userData');
	try {
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'select firstName,lastName,contact,email_id,user_id,active_status from userData;';

			connection.query(query, (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log('response', response);
		// console.log(response);
		// return resultdb(200, 'user deleted successfully');
		return response;
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};

let sellerData = async (req) => {
	// console.log('userData');
	try {
		var role = req.body.role;
		role = parseInt(role)
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from seller where role=?;';

			connection.query(query, [role], (err, results) => {
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

let userCount = async (data) => {
	// console.log('userData');
	try {
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'SELECT COUNT(*) AS id_count FROM userData;';

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
let sellerCount = async (data) => {
	// console.log('userData');
	try {
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'SELECT COUNT(*) AS id_count FROM seller;';

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
let adminData = async (data) => {
	// console.log('userData');
	try {
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from admin;';

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

let registersubadmin=async(req)=>
{
	try {
		// console.log(req)
		const username = req.body.username;
		const password = req.body.password;
		var role = req.body.role;
		role = parseInt(role)
		var deleteUser = req.body.deleteUser;
		
        
		console.log(role);
		console.log(deleteUser)
		// console.log(contact);
		// console.log(email);
		// console.log(10);
		// let genSalt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		// let hash = await bcrypt.hash(password, genSalt);
		// console.log(hash);
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'SELECT * FROM subadmin WHERE username = ?;';
			connection.query(query, [username], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log('response', response);
		if (response.length > 0) {
			return resultdb(303, 'username already exist');
		}  else {
				const response2 = await new Promise((resolve, reject) => {
					const query =
						'INSERT INTO subadmin (username,password,role) VALUES(?,?,?);';
					connection.query(
						query,
						[username,password,role],
						(err, results) => {
							if (err) reject(new Error(err.message));
							resolve(results);
						}
					);
				});
				console.log('response2', response2);
				return resultdb(200, 'subadmin created successfully');
			}
		// return resultdb(200, 'User created successfully');
		
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}

let loginadminByUsername = async (username, password,role) => {
	console.log(role);
	var isPasswordMatch = false;
	if(role==0)
	{
		try {
			var connection = config.connection;
			const response = await new Promise((resolve, reject) => {
				const query = 'select * from admin WHERE username = ?;';
				connection.query(query, [username], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			if (response.length > 0) {
				if(response[0].password==password)
				{   
					let admindata={
						id_admin:response[0].id_admin,
						username:response[0].username,
						role:response[0].role,
					}
					let token = jwt.sign(admindata, secretKey, {
						expiresIn: 1800, // expires in 30min
					});
					let returnadmindata={
						id_admin:response[0].id_admin,
						username:response[0].username,
						role:response[0].role,
						token:token
					}
					return resultdb(200,returnadmindata);
				}
				else{
					return resultdb(400, 'Login Failed');
				}
		
			}
			return resultdb(400, 'Login Failed');
		} catch (err) {
			console.log(err);
			return resultdb(500, err);
		}
	}

 else
{

	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from subadmin WHERE username = ? AND role=?';
			connection.query(query, [username,role], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log(response);
		if (response.length > 0) {
			if(response[0].password==password)
			{
				let subadmindata={
					id_subadmin:response[0].id_subadmin,
					username:response[0].username,
					role:response[0].role,
				}
				let token = jwt.sign(subadmindata, secretKey, {
					expiresIn: 1800, // expires in 30min
				});
				let returnsubadmindata={
					id_subadmin:response[0].id_subadmin,
					username:response[0].username,
					role:response[0].role,
					token:token
				}
				return resultdb(200,returnsubadmindata);
			}
			else{
				return resultdb(400, 'Login Failed');
			}
	
		}
		return resultdb(400, 'Login Failed');
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}
 
};

let subadminData = async (data) => {
	// console.log('userData');
	try {
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from subadmin;';

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
let subadminPerm = async (data) => {
	// console.log('userData');
	try {
        const username = data.body.username;
		var connection = config.connection;
		// let qry = util.promisify(connection.query).bind(connection);
		// let result = await connection.query(qry,);
		// connection.query('select * from userData',fun);
		const response = await new Promise((resolve, reject) => {
			const query = 'select * from subadmin where username=?;';

			connection.query(query,[username] ,(err, results) => {
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


let selleradd=async (req)=>{
	try {
		// console.log(data);
		// console.log(req)
		const username = req.body.username;
		const password = req.body.password;
		const email_id=req.body.email_id;
		const gst_no=req.body.gst_no;
		const shop=req.body.shop;
		var contact=req.body.contact;
		contact=parseInt(contact);
		var role = req.body.role;
		role = parseInt(role);
		// console.log(contact);
		// console.log(email);
		// console.log(10);
		// let genSalt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		// let hash = await bcrypt.hash(password, genSalt);
		// console.log(hash);
		var connection = config.connection;

		const response = await new Promise((resolve, reject) => {
			const query = 'SELECT * FROM seller WHERE username = ?;';
			connection.query(query, [username], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
		});
		// console.log('response', response);
		if (response.length > 0) {
			return resultdb(303, 'username already exist');
		}  else {

			const response = await new Promise((resolve, reject) => {
				const query = 'SELECT * FROM seller WHERE email_id = ?;';
				connection.query(query, [email_id], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});

			if (response.length > 0) {
				return resultdb(303, 'email already exist');
			} else{
				const response = await new Promise((resolve, reject) => {
					const query = 'SELECT * FROM seller WHERE gst_id = ?;';
					connection.query(query, [gst_no], (err, results) => {
						if (err) reject(new Error(err.message));
						resolve(results);
					});
				});
				if (response.length > 0) {
					return resultdb(303, 'Gst_no already exist');
				}
				else{
					const response = await new Promise((resolve, reject) => {
						const query = 'SELECT * FROM seller WHERE shop = ?;';
						connection.query(query, [shop], (err, results) => {
							if (err) reject(new Error(err.message));
							resolve(results);
						});
					});
					if (response.length > 0) {
						return resultdb(303, 'shop already exist');
					}
					else{
						const response = await new Promise((resolve, reject) => {
							const query = 'SELECT * FROM seller WHERE contact = ?;';
							connection.query(query, [contact], (err, results) => {
								if (err) reject(new Error(err.message));
								resolve(results);
							});
						});
						if (response.length > 0) {
							return resultdb(303, 'contact already exist');
						}
						else{
							const response = await new Promise((resolve, reject) => {
								const query = 'INSERT INTO seller (username,password,email_id,gst_id,shop,contact,role) VALUES(?,?,?,?,?,?,?);';
								connection.query(query, [username,password,email_id,gst_no,shop,contact,role], (err, results) => {
									if (err) reject(new Error(err.message));
									resolve(results);
								});
							});
							console.log(response);
							return resultdb(200, 'subadmin created successfully');
						}
					}
				}
			}
				// const response2 = await new Promise((resolve, reject) => {
				// 	const query =
				// 		'INSERT INTO subadmin (username,password,role) VALUES(?,?,?);';
				// 	connection.query(
				// 		query,
				// 		[username,password,role],
				// 		(err, results) => {
				// 			if (err) reject(new Error(err.message));
				// 			resolve(results);
				// 		}
				// 	);
				// });
				// console.log('response2', response2);
				// return resultdb(200, 'subadmin created successfully');
			}
		return resultdb(200, 'User created successfully');
		
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
}

module.exports = {

    sellertatusupdate,
    getsellerData,
    userstatusupdate,
    deleteuser,
    getuserData,
    sellerData,
    userCount,
    sellerCount,
    adminData,
    registersubadmin,
    loginadminByUsername,
    subadminData,
    subadminstatusupdate,
    subadminPerm,
    deleteseller,
	selleradd,
}