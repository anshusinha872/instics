const MysqlPool = require("../../app");
const config = require("../../config/databaseConfig.js");
const util = require("util");
const mysql = require("mysql");
const resultdb = (statusCode, data = null) => {
  return {
    statusCode: statusCode,
    data: data,
  };
};
let updatePaymentStatus = async (req) => {
  console.log("webhook response", req.body);
  const id = req.body.id;
  const customer_vpa = req.body.customer_vpa;
  const amount = req.body.amount;
  const client_txn_id = req.body.client_txn_id;
  const customer_name = req.body.customer_name;
  const customer_email = req.body.customer_email;
  const customer_mobile = req.body.customer_mobile;
  const p_info = req.body.p_info;
  const upi_txn_id = req.body.upi_txn_id;
  const status = req.body.status;
  // const payment_status = req.body.status == "success" ? "1" : "0";
  const remark = req.body.remark;
  const udf1 = req.body.udf1;
  const udf2 = req.body.udf2;
  const udf3 = req.body.udf3;
  const redirect_url = req.body.redirect_url;
  const txnAt = req.body.txnAt;
  const createdAt = req.body.createdAt;
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO paymentRecords (id,customer_vpa,amount,customer_name,customer_email,customer_mobile,p_info,upi_txn_id,status,remark,udf1,udf2,udf3,redirect_url,txnAt,createdAt,client_txn_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ;";
      connection.query(
        query,
        [
          id,
          customer_vpa,
          amount,
          customer_name,
          customer_email,
          customer_mobile,
          p_info,
          upi_txn_id,
          status,
          remark,
          udf1,
          udf2,
          udf3,
          redirect_url,
          txnAt,
          createdAt,
          client_txn_id,
        ],
        (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        }
      );
    });

    // update payment status in paymentOrderRequest table
    const updatePaymentRequestResponse = await new Promise(
      (resolve, reject) => {
        const query =
          "UPDATE paymentOrderRequest SET payment_status = ? WHERE txnId = ?;";
        connection.query(query, [status, client_txn_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      }
    );
    // update payment status in all serviceorder request table
    const serviceListResponse = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM paymentOrderRequest WHERE txnId = ?;";
      connection.query(query, [client_txn_id], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    if (serviceListResponse.length > 0) {
      // console.log("serviceListResponse", serviceListResponse[0]);
      const printPayment = serviceListResponse[0].printPayment;
      const printPaymentTxnIdList = serviceListResponse[0].printPaymentTxnId;
      console.log("printPaymentTxnIdList", printPaymentTxnIdList);
      const laundryPayment = serviceListResponse[0].laundryPayment;
      const laundryPaymentTxnIdList =
        serviceListResponse[0].laundryPaymentTxnId;
      console.log("laundryPaymentTxnIdList", laundryPaymentTxnIdList);
      if (printPayment == 1) {
        const printPaymentTxnIdArray = printPaymentTxnIdList.split(",");
        for (let i = 0; i < printPaymentTxnIdArray.length; i++) {
          const printPaymentTxnId = printPaymentTxnIdArray[i];
          console.log("printPaymentTxnId", printPaymentTxnId);
          var connection = config.connection;
          const updatePrintPaymentStatusResponse = await new Promise(
            (resolve, reject) => {
              const query =
                "UPDATE pdfOrderRequest SET payment_status = ?, paymentRequestTxnId = ? WHERE pdfOrderRequestTxnId = ?;";
              connection.query(
                query,
                [status, client_txn_id, printPaymentTxnId],
                (err, results) => {
                  if (err) reject(new Error(err.message));
                  resolve(results);
                }
              );
            }
          );
          // update payment status in printDocRecordTable table
          const updatePrintDocRecordTableResponse = await new Promise(
            (resolve, reject) => {
              const query =
                "UPDATE printDocRecordTable SET payment_status = ? WHERE pdfOrderRequestTxnId = ?;";
              connection.query(
                query,
                [status, printPaymentTxnId],
                (err, results) => {
                  if (err) reject(new Error(err.message));
                  resolve(results);
                }
              );
            }
          )
        }
      }
      if (laundryPayment == 1) {
        const laundryPaymentTxnIdArray = laundryPaymentTxnIdList.split(",");
        for (let i = 0; i < laundryPaymentTxnIdArray.length; i++) {
          const laundryPaymentTxnId = laundryPaymentTxnIdArray[i];
          const updateLaundryPaymentStatusResponse = await new Promise(
            (resolve, reject) => {
              const query =
                "UPDATE laundryOrderRequest SET paymentStatus = ?, paymentRequestTxnId = ? WHERE laundryOrderRequestTxnId = ?;";
              connection.query(
                query,
                [status, client_txn_id, laundryPaymentTxnId],
                (err, results) => {
                  if (err) reject(new Error(err.message));
                  resolve(results);
                }
              );
            }
          );
        }
      }
    }
    // console.log(response);
    return resultdb(200, response);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let recordPaymentRequest = async (responseData, data) => {
  let dataRecord = JSON.parse(data);
  let responseDataRecord = responseData;
  console.log("data1", dataRecord);
  console.log("response1", responseDataRecord);
  const user_id = dataRecord.userId;
  const client_txn_id = dataRecord.client_txn_id;
  const amount = dataRecord.amount;
  const p_info = dataRecord.p_info;
  const customer_name = dataRecord.customer_name;
  const customer_email = dataRecord.customer_email;
  const customer_mobile = dataRecord.customer_mobile;
  const redirect_url = dataRecord.redirect_url;
  const payment_url = responseDataRecord.data.payment_url;
  const pdfPresent = dataRecord.pdfPresent == false ? 0 : 1;
  const pdfOrderRequestTxnIdList = dataRecord.pdfOrderRequestTxnIdList;
  const laundryPresent = dataRecord.laundryPresent == false ? 0 : 1;
  const laundryOrderRequestTxnIdList = dataRecord.laundryOrderRequestTxnIdList;
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO paymentOrderRequest (txnId,amount,customer_name,customer_email,customer_mobile,redirect_url,payment_url,user_id,payment_status,printPayment,printPaymentTxnId,laundryPayment,laundryPaymentTxnId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) ;";
      connection.query(
        query,
        [
          client_txn_id,
          amount,
          customer_name,
          customer_email,
          customer_mobile,
          redirect_url,
          payment_url,
          user_id,
          0,
          pdfPresent,
          pdfOrderRequestTxnIdList.toString(),
          laundryPresent,
          laundryOrderRequestTxnIdList.toString(),
        ],
        (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        }
      );
    });
    console.log(response);
    return resultdb(200, response);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let updatePdfPaymentStatus = async (user_id, pdf_id, client_txn_id, status) => {
  try {
    let updateQueryResponse = [];
    console.log("pdf_id", pdf_id);
    console.log("user_id", user_id);
    console.log("client_txn_id", client_txn_id);
    let pdfIdArray = [];
    if (pdf_id.includes(",")) {
      pdfIdArray = pdf_id.split(",");
    } else {
      pdfIdArray.push(pdf_id);
    }
    console.log("pdfIdArray", pdfIdArray);
    for (let i = 0; i < pdfIdArray.length; i++) {
      var connection = config.connection;
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE printDocTable SET client_txn_id = ?, payment_status = ? WHERE id = ?;";
        connection.query(
          query,
          [client_txn_id, status, pdfIdArray[i]],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      updateQueryResponse.push(response);
    }
    // console.log('updateQueryResponse', updateQueryResponse);
    return resultdb(200, updateQueryResponse);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let getPaymentOrderRequestDetails = async (client_txn_id) => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM payment_order_request WHERE client_txn_id = ?;";
      connection.query(query, [client_txn_id], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    // console.log(response);
    return resultdb(200, response);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let updatePdfDetailsWebhook = async (pdf_id, status, client_txn_id) => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "UPDATE printDocTable SET payment_status = ?,client_txn_id = ? WHERE id = ?;";
      connection.query(
        query,
        [status, client_txn_id, pdf_id],
        (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        }
      );
    });
    // console.log(response);
    return resultdb(200, response);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let updatePaymentRequest = async (client_txn_id, status) => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "UPDATE payment_order_request SET payment_status = ? WHERE client_txn_id = ?;";
      connection.query(query, [status, client_txn_id], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    // console.log(response);
    return resultdb(200, response);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let getPaymentHistory = async (user_id) => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM paymentOrderRequest WHERE user_id = ? ORDER BY id DESC;";
      connection.query(query, [user_id], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    // console.log(response);
    return resultdb(200, response);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let manualUpdatePaymentRecords = async (data) => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "UPDATE paymentOrderRequest SET payment_status = ? WHERE txnId = ?;";
      connection.query(
        query,
        [data.status, data.client_txn_id],
        (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        }
      );
    });
    // update payment status in all serviceorder request table
    const serviceListResponse = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM paymentOrderRequest WHERE txnId = ?;";
      connection.query(query, [data.client_txn_id], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    if (serviceListResponse.length > 0) {
      // console.log("serviceListResponse", serviceListResponse[0]);
      const printPayment = serviceListResponse[0].printPayment;
      const printPaymentTxnIdList = serviceListResponse[0].printPaymentTxnId;
      console.log("printPaymentTxnIdList", printPaymentTxnIdList);
      const laundryPayment = serviceListResponse[0].laundryPayment;
      const laundryPaymentTxnIdList =
        serviceListResponse[0].laundryPaymentTxnId;
      console.log("laundryPaymentTxnIdList", laundryPaymentTxnIdList);
      if (printPayment == 1) {
        const printPaymentTxnIdArray = printPaymentTxnIdList.split(",");
        for (let i = 0; i < printPaymentTxnIdArray.length; i++) {
          const printPaymentTxnId = printPaymentTxnIdArray[i];
          console.log("printPaymentTxnId", printPaymentTxnId);
          var connection = config.connection;
          const updatePrintPaymentStatusResponse = await new Promise(
            (resolve, reject) => {
              const query =
                "UPDATE pdfOrderRequest SET payment_status = ?, paymentRequestTxnId = ? WHERE pdfOrderRequestTxnId = ?;";
              connection.query(
                query,
                [data.status, data.client_txn_id, printPaymentTxnId],
                (err, results) => {
                  if (err) reject(new Error(err.message));
                  resolve(results);
                }
              );
            }
          );
        }
      }
      if (laundryPayment == 1) {
        const laundryPaymentTxnIdArray = laundryPaymentTxnIdList.split(",");
        for (let i = 0; i < laundryPaymentTxnIdArray.length; i++) {
          const laundryPaymentTxnId = laundryPaymentTxnIdArray[i];
          const updateLaundryPaymentStatusResponse = await new Promise(
            (resolve, reject) => {
              const query =
                "UPDATE laundryOrderRequest SET paymentStatus = ?, paymentRequestTxnId = ? WHERE laundryOrderRequestTxnId = ?;";
              connection.query(
                query,
                [data.status, data.client_txn_id, laundryPaymentTxnId],
                (err, results) => {
                  if (err) reject(new Error(err.message));
                  resolve(results);
                }
              );
            }
          );
        }
      }
    }
    return resultdb(200, 'Updated');
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
module.exports = {
  updatePaymentStatus,
  recordPaymentRequest,
  manualUpdatePaymentRecords,
  // updatePdfPaymentStatus,
  getPaymentOrderRequestDetails,
  updatePdfDetailsWebhook,
  // updatePaymentRequest,
  getPaymentHistory,
};
