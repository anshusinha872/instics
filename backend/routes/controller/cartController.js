const express = require("express");
const MysqlPool = require("../../app");
const router = express.Router();
const cartService = require("../service/cartService");
const paymentService = require("../service/paymentService");
// const sdk = require('api')('@instamojo/v2#ulug320lc4eyadv');
const axios = require("axios");
const { URLSearchParams } = require("url");
const userService = require("../service/userService");
const { json } = require("express");
const secretKey = "1bd690fe-89eb-4d8a-87a3-1b8af4107506";
// Get order history
async function getCartItems(req, res) {
  try {
    const user_id = req.body.user_id;
    let returndata = await cartService.getCartItems(user_id);
    return res.status(200).json(returndata);
  } catch (err) {
    console.log(err);
  }
}
async function createOrder(req, res) {
  // console.log('reqBody',req.body);
  let amountVar = req.body.amount;
  amountVar = amountVar.toString();
  const user_id = req.body.user_id;
  let userdata = await userService.userDataByUserId(user_id);
  let txnId = await cartService.orderId();
  var axios = require("axios");
  var data = JSON.stringify({
    key: secretKey,
    pdfPresent:req.body.pdfPresent,
    laundryPresent:req.body.laundryPresent,
    pdfOrderRequestTxnIdList:req.body.pdfOrderRequestTxnIdList,
    laundryOrderRequestTxnIdList:req.body.laundryOrderRequestTxnIdList,
    client_txn_id: txnId,
    amount: amountVar,
    userId:req.body.user_id,
    p_info: req.body.p_info,
    customer_name: userdata.data[0].firstName + " " + userdata.data[0].lastName,
    customer_email: userdata.data[0].email_id,
    customer_mobile: userdata.data[0].contact.toString(),
    redirect_url: "https://instincts.co.in/dashboard/paymentVerification",
  });
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://merchant.upigateway.com/api/create_order",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      paymentService.recordPaymentRequest(response.data, data);
      return res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
async function deletePDFItem(req, res) {
  try {
    console.log(req.body.item_type);
    console.log(req.body.item_id);
    if (req.body.item_type == "Laundary") {
      let returndata = await cartService.deleteLaundryItem(
        req.body.user_id,
        req.body.item_id
      );
      return res.status(200).json(returndata);
    }
    // if(req.body.item_type == 'Printing')
    else {
      let returndata = await cartService.deletePrintingItem(
        req.body.user_id,
        req.body.item_id
      );
	  return res.status(200).json(returndata);
    }
	return res.status(200).json("Some error occured");
    // let returndata = await cartService.deletePDFItem(user_id, pdf_id);
  } catch (err) {
    console.log(err);
  }
}
async function checkPaymentStatus(req, res) {
  let status = "pending";
  try {
    const txn_date = req.body.txn_date;
    const client_txn_id = req.body.client_txn_id;
    const pdf_id = req.body.pdf_id;
    const user_id = req.body.user_id;
    var axios = require("axios");
    var data = JSON.stringify({
      key: secretKey,
      client_txn_id: client_txn_id,
      txn_date: txn_date,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://merchant.upigateway.com/api/check_order_status",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("response", response.data.data);
        if (response.data.data.status == "success") {
          let updatePdfPaymentResponse = paymentService.updatePdfPaymentStatus(
            user_id,
            pdf_id,
            client_txn_id,
            "success"
          );
          let updatePaymentRequest = paymentService.updatePaymentRequest(
            client_txn_id,
            "success"
          );
          return res.status(200).json(response.data);
        } else {
          let updatePdfPaymentResponse = paymentService.updatePdfPaymentStatus(
            user_id,
            pdf_id,
            client_txn_id,
            "failure"
          );
          let updatePaymentRequest = paymentService.updatePaymentRequest(
            client_txn_id,
            "failure"
          );
          return res.status(200).json(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
}
async function getPaymentHistory(req, res) {
  try {
    const user_id = req.body.user_id;
    let returndata = await paymentService.getPaymentHistory(user_id);
    return res.status(200).json(returndata);
  } catch (err) {
    console.log(err);
  }
}
router.post("/cart/view", getCartItems);
router.post("/cart/createOrder", createOrder);
// router.post('/cart/orderPay', orderPay);
router.post("/cart/delete", deletePDFItem);
router.post("/cart/checkPaymentStatus", checkPaymentStatus);
router.post("/getPaymentHistory", getPaymentHistory);
module.exports = router;
