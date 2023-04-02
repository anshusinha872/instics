const MysqlPool = require("../../app");
const config = require("../../config/databaseConfig.js");
const util = require("util");
const mysql = require("mysql");
const pdfService = require("./pdfService");
const resultdb = (statusCode, data = null) => {
  return {
    statusCode: statusCode,
    data: data,
  };
};

let getCartItems = async (user_id) => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM pdfOrderRequest WHERE user_id = ? AND payment_status = ?;";
      connection.query(query, [user_id, "pending"], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    let returnData = [];
    if (response.length > 0) {
      let orderDetails = [];
      // console.log(response);
      orderDetails.push({
        orderType: "Printing",
      });
      let orderList = [];
      for (let i = 0; i < response.length; i++) {
        // console.log(response[i]);
        let data = {
          id: response[i].id,
          pdfOrderRequestTxnId: response[i].pdfOrderRequestTxnId,
          orderType: "Printing",
          pdfName: response[i].pdfName,
          docType: response[i].docType,
          colorMode: response[i].colorMode,
          totalPage: response[i].totalPage,
          totalCost: response[i].totalCost,
          docStatus: response[i].docStatus,
        };
        orderList.push(data);
      }
      orderDetails.push(orderList);
      // return resultdb(200, returnData);
      returnData.push(orderDetails);
    }
    const laundaryResponse = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM laundryOrderRequest WHERE user_id = ? and paymentMode = ? and paymentStatus = ?;";
      connection.query(query, [user_id, 'upi',0], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    if (laundaryResponse.length > 0) {
      // console.log(laundaryResponse);
      let orderDetails = [];
      // console.log(response);
      orderDetails.push({
        orderType: "Laundary",
      });
      let orderList = [];
      for (let i = 0; i < laundaryResponse.length; i++) {
        console.log(laundaryResponse[i]);
        let data = {
          id: laundaryResponse[i].id,
          laundryOrderRequestTxnId:
            laundaryResponse[i].laundryOrderRequestTxnId,
          orderType: "Laundary",
          totalAmount: laundaryResponse[i].amount,
          paymentStatus: laundaryResponse[i].paymentStatus,
          paymentMode: laundaryResponse[i].paymentMode,
          couponCode: laundaryResponse[i].couponCode,
          couponDiscountMode: laundaryResponse[i].couponDiscountMode,
          couponDiscountAmount: laundaryResponse[i].couponDiscount,
          FinalPrice: laundaryResponse[i].finalAmountAfterDiscount,
        };
        orderList.push(data);
      }
      orderDetails.push(orderList);
      returnData.push(orderDetails);
    }
    return resultdb(200, returnData);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let orderId = async () => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM paymentOrderRequest;";
      connection.query(query, (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    let orderId = response.length + 1;
    orderId = "TestS14" + orderId;
    console.log(orderId);
    return orderId;
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let deleteLaundryItem = async (user_id, item_id) => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM laundryOrderRequest WHERE user_id = ? AND laundryOrderRequestTxnId = ?;";
      connection.query(query, [user_id, item_id], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    return resultdb(200, response);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let deletePrintingItem = async (user_id, item_id) => {
	try{
		var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM pdfOrderRequest WHERE user_id = ? AND pdfOrderRequestTxnId = ?;";
      connection.query(query, [user_id, item_id], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    return resultdb(200, response);
	}
	catch(err){
		console.log(err);
		return resultdb(500, err);
	}
}
module.exports = {
  getCartItems,
  orderId,
  deleteLaundryItem,
  deletePrintingItem,
};
