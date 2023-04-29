const MysqlPool = require("../../app");
const config = require("../../config/databaseConfig.js");
const util = require("util");
const mysql = require("mysql");
const { time } = require("console");
const userService = require("../service/userService");
const { response } = require("express");
const resultdb = (statusCode, data = null) => {
  return {
    statusCode: statusCode,
    data: data,
  };
};
let addServiceName = async (data) => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM laundryClothSectionName WHERE sectionName = ?";
      connection.query(query, [data], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    if (response.length > 0) {
      return resultdb(303, "Section Name Already exists");
    } else {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO laundryClothSectionName(sectionName) VALUES (?)";
        connection.query(query, [data], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
    }
    console.log(response);
    return resultdb(200, "Section added");
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let showClothSection = async () => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM laundryClothSectionName ";
      connection.query(query, (err, results) => {
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
let addClothType = async (data) => {
  try {
    console.log(data);
    const typeName = data.name;
    const price = data.price;
    const clothSectionName = data.sectionName;
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO laundryClothType (typeName,price,clothSectionName) VALUES (?,?,?)";
      connection.query(
        query,
        [typeName, price, clothSectionName],
        (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        }
      );
    });
    return resultdb(200, "Cloth Type Added");
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let showClothType = async () => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM laundryClothSectionName";
      connection.query(query, (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    let clothesData = [];
    for (let i = 0; i < response.length; i++) {
      let clothSection = {
        sectionName: response[i].sectionName,
        clothes: [],
      };
      clothesData.push(clothSection);
    }
    for (let i = 0; i < clothesData.length; i++) {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT * FROM laundryClothType WHERE clothSectionName = ?";
        console.log("section", clothesData[i].sectionName);
        connection.query(
          query,
          [clothesData[i].sectionName],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      if (response.length > 0) {
        for (let j = 0; j < response.length; j++) {
          clothesData[i].clothes.push(response[j]);
        }
      }
    }
    return resultdb(200, clothesData);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let deleteSection = async (data) => {
  try {
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM laundryClothSectionName WHERE id = ?";
      connection.query(query, [data], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    if (response.length > 0) {
      const sectionName = response[0].sectionName;
      var connection = config.connection;
      const deleteResponse = await new Promise((resolve, reject) => {
        const deleteQuery =
          "DELETE FROM laundryClothType WHERE clothSectionName = ?";
        connection.query(deleteQuery, [sectionName], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      if (deleteResponse.affectedRows > 0 || true) {
        var connection = config.connection;
        const deleteSectionResponse = await new Promise((resolve, reject) => {
          const deleteQuery =
            "DELETE FROM laundryClothSectionName WHERE id = ?";
          connection.query(deleteQuery, [data], (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          });
        });
      }
    }
    // console.log(response);
    return resultdb(200, "Section deleted");
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let deleteClothType = async (data) => {
  try {
    // console.log(data,'data');
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM laundryClothType WHERE id = ?";
      connection.query(query, [data], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    console.log(178, response);
    return resultdb(200, "Cloth Type deleted");
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let placeLaundryOrder = async (data) => {
  try {
    const userId = parseInt(data.userId);
    let userData = await userService.userDataByUserId(userId);
    const customer_name =
      userData.data[0].firstName + " " + userData.data[0].lastName;
    const customer_email = userData.data[0].email_id;
    const customer_mobile = userData.data[0].contact;
    const latitude = data.latitude.toString();
    const longitude = data.longitude.toString();
    const order_info = "Laundry Order";
    var connection = config.connection;
    let response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO laundryOrderRequest (amount,order_info,customer_name,customer_email,customer_mobile,status,address,latitude,longitude,user_id,paymentMode,paymentStatus,couponCode,couponDiscount,finalAmountAfterDiscount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      connection.query(
        query,
        [
          data.totalPrice,
          order_info,
          customer_name,
          customer_email,
          customer_mobile,
          0,
          data.address,
          latitude,
          longitude,
          data.userId,
          data.paymentMode,
          'pending',
          data.couponCode,
          data.discountPrice,
          data.finalPrice,
        ],
        (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        }
      );
    });
    const insertId = response.insertId;
    let transactionId = insertId;
    transactionId = "LS" + transactionId;
    let updateResponse = await new Promise((resolve, reject) => {
      const query =
        "UPDATE laundryOrderRequest SET laundryOrderRequestTxnId = ? WHERE id = ?";
      connection.query(query, [transactionId, insertId], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    for (let i = 0; i < data.clothes.length; i++) {
      response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO laundryOrderItemRecords (user_id,laundryOrderRequestTxnId,clothType,clothTypeSection,quantity,amount) VALUES (?,?,?,?,?,?)";
        connection.query(
          query,
          [
            userId,
            transactionId,
            data.clothes[i].typeName,
            data.clothes[i].clothSectionName,
            data.clothes[i].quantity,
            data.clothes[i].price,
          ],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
    }
    return resultdb(200, transactionId);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let getOrderDetailsByUserId = async (userId) => {
  try {
    let returnData = [];
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM laundryOrderRequest WHERE user_id = ? ORDER BY id DESC";
      connection.query(query, [userId], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    console.log("laundry order history", response);
    console.log(response.length);
    for (let i = 0; i < response.length; i++) {
      let orderDetails = [];
      let orderInfo = {
        laundryOrderRequestTxnId: response[i].laundryOrderRequestTxnId,
        amount: response[i].amount,
        order_info: response[i].order_info,
        customer_name: response[i].customer_name,
        customer_email: response[i].customer_email,
        customer_mobile: response[i].customer_mobile,
        status: response[i].status,
        paymentMode: response[i].paymentMode,
        paymentStatus: response[i].paymentStatus,
        couponCode: response[i].couponCode,
        couponDiscount: response[i].couponDiscount,
        finalAmountAfterDiscount: response[i].finalAmountAfterDiscount,
      };
      orderDetails.push(orderInfo);
      let orderItems = [];
      let orderListItemResponse = await new Promise((resolve, reject) => {
        const query =
          "SELECT * FROM laundryOrderItemRecords WHERE laundryOrderRequestTxnId = ? ";
        connection.query(
          query,
          [response[i].laundryOrderRequestTxnId],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      for (let j = 0; j < orderListItemResponse.length; j++) {
        let orderListItem = {
          clothType: orderListItemResponse[j].clothType,
          clothTypeSection: orderListItemResponse[j].clothTypeSection,
          quantity: orderListItemResponse[j].quantity,
          amount: orderListItemResponse[j].amount,
        };
        orderItems.push(orderListItem);
      }
      orderDetails.push(orderItems);
      returnData.push(orderDetails);
    }
    return resultdb(200, returnData);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let getLaundryOrderDetails = async (req) => {
  console.log(req);
  	
  
  try {
    let returnData = [];
    var connection = config.connection;
    const response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM laundryOrderRequest  ORDER BY id DESC";
      connection.query(query, (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    console.log("laundry order history", response);
    console.log(response.length);
    for (let i = 0; i < response.length; i++) {
      let orderDetails = [];
      let orderInfo = {
        laundryOrderRequestTxnId: response[i].laundryOrderRequestTxnId,
        amount: response[i].amount,
        order_info: response[i].order_info,
        customer_name: response[i].customer_name,
        customer_email: response[i].customer_email,
        customer_mobile: response[i].customer_mobile,
        customer_address: response[i].address,
        latitude: response[i].latitude,
        longitude: response[i].longitude,
        status: response[i].status,
        paymentMode: response[i].paymentMode,
        paymentStatus: response[i].paymentStatus,
        couponCode: response[i].couponCode,
        couponDiscount: response[i].couponDiscount,
        finalAmountAfterDiscount: response[i].finalAmountAfterDiscount,
      };
      orderDetails.push(orderInfo);
      let orderItems = [];
      let orderListItemResponse = await new Promise((resolve, reject) => {
        const query =
          "SELECT * FROM laundryOrderItemRecords WHERE laundryOrderRequestTxnId = ? ";
        connection.query(
          query,
          [response[i].laundryOrderRequestTxnId],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });
      for (let j = 0; j < orderListItemResponse.length; j++) {
        let orderListItem = {
          clothType: orderListItemResponse[j].clothType,
          clothTypeSection: orderListItemResponse[j].clothTypeSection,
          quantity: orderListItemResponse[j].quantity,
          amount: orderListItemResponse[j].amount,
        };
        orderItems.push(orderListItem);
      }
      orderDetails.push(orderItems);
      returnData.push(orderDetails);
    }
    return resultdb(200, returnData);
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }

};
let createCoupon = async (data) => {
  try {
    var connection = config.connection;
    let response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO discountCouponRecords (code,discountType,discountValue,minimumAmount) VALUES (?,?,?,?)";
      connection.query(
        query,
        [
          data.code,
          data.discountType,
          data.discountValue,
          data.minimumAmount,
        ],
        (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        }
      );
    });
    return resultdb(200, "Coupon Created");
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
}
let deleteCoupon = async (data) => {
  try{
    var connection = config.connection;
    let response = await new Promise((resolve, reject) => {
      const query =
        "DELETE FROM discountCouponRecords WHERE code = ?";
      connection.query(
        query,
        [data.code],
        (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        }
      );
    });
    return resultdb(200, "Coupon Deleted");
  }
  catch(err){
    console.log(err);
    return resultdb(500, err);
  }
}
let getAllCoupons = async () => {
  try{
    var connection = config.connection;
    let response = await new Promise((resolve, reject) => {
      const query =
        "SELECT * FROM discountCouponRecords";
      connection.query(
        query,
        (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        }
      );
    });
    let returnData  = [];
    for(let i = 0; i < response.length; i++){
      let coupon = {
        code: response[i].code,
        discountType: response[i].discountType,
        discountValue: response[i].discountValue,
        minimumAmount: response[i].minimumAmount,
      }
      returnData.push(coupon);
    }
    return resultdb(200, returnData);
  }
  catch(err){
    console.log(err);
    return resultdb(500, err);
  }
};
let updateStatus = async (data) => {
  try{
    var connection = config.connection;
    let response = await new Promise((resolve, reject) => {
      const query =
        "UPDATE laundryOrderRequest SET status = ? WHERE laundryOrderRequestTxnId = ?";
      connection.query(
        query,
        [data.status, data.id],
        (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        }
      );
    });
    return resultdb(200, "Status Updated");
  }
  catch(err){
    console.log(err);
    return resultdb(500, err);
  }
}
module.exports = {
  addServiceName,
  showClothSection,
  addClothType,
  showClothType,
  deleteSection,
  deleteClothType,
  placeLaundryOrder,
  getOrderDetailsByUserId,
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getLaundryOrderDetails,
  updateStatus,
};
