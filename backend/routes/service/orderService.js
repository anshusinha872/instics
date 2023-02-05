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

let getOrderHistory = async (user_id) => {
	try {
		var connection = config.connection;
		const response = await new Promise((resolve, reject) => {
			const query = 'SELECT * FROM printDocTable WHERE user_id = ?;';
			connection.query(query,[user_id], (err, results) => {
				if (err) reject(new Error(err.message));
				resolve(results);
			});
        });
        if (response.length > 0) {
            let returnData = [];
            for (let i = 0; i < response.length; i++) {
                let data = {
                    id: i,
                    totalPage: response[i].totalPage,
                    totalCost: response[i].totalCost,
                    docStatus: response[i].docStatus,
                };
                returnData.push(data);
            }
            return resultdb(200, returnData);
        }
        else {
            return resultdb(404, 'No Order History');
        }
		return resultdb(200, response);
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
module.exports = {
	getOrderHistory,
};
