const MysqlPool = require("../../app");
const config = require("../../config/databaseConfig.js");
const util = require("util");
const mysql = require("mysql");
const { time } = require("console");
const userService = require('../service/userService');
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
    console.log(178,response);
    return resultdb(200, "Cloth Type deleted");
  } catch (err) {
    console.log(err);
    return resultdb(500, err);
  }
};
let placeLaundryOrder = async (data) => {
  try{
    var connection = config.connection;
    let response = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM laundry_order_request";
      connection.query(query, [data], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    const userId = parseInt(data.userId,10);
    console.log(197,userId);
    let userData = await userService.userDataByUserId(userId);
    // userData= userData.data;
    const customer_name = userData.data[0].firstName+' '+userData.data[0].lastName;
    const customer_email = userData.data[0].email_id;
    const customer_mobile = userData.data[0].contact;
    const latitude = data.latitude.toString();
    const longitude = data.longitude.toString();
    console.log('userData',userData.data[0]);
    console.log('customer_name',customer_name);
    console.log('customer_email',customer_email);
    console.log('customer_mobile',customer_mobile);
    let length = response.length+1;
    length = length.toString();
    console.log('string length',length);
    const transactionId = 'LS'+length;
    console.log(transactionId);
    // 
    for(let i=0;i<data.clothes.length;i++){
      // console.log(data.clothes[i]);
      response = await new Promise((resolve, reject) => {
        const query = "INSERT INTO laundryOrderItemRecords (user_id,client_txn_id,clothType,clothTypeSection,quantity,amount) VALUES (?,?,?,?,?,?)";
        connection.query(query, [userId,transactionId,data.clothes[i].typeName,data.clothes[i].clothSectionName,data.clothes[i].quantity,data.clothes[i].price], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
    }
    // 
    const order_info = 'Laundry Order'
    // let totalPriceCal = data.totalPrice.toString();
    response = await new Promise((resolve, reject) => {
      const query = "INSERT INTO laundry_order_request (client_txn_id,amount,order_info,customer_name,customer_email,customer_mobile,status,address,latitude,longitude) VALUES (?,?,?,?,?,?,?,?,?,?)";
      connection.query(query, [transactionId,data.totalPrice,order_info,customer_name,customer_email,customer_mobile,0,data.address,latitude,longitude], (err, results) => {
        if (err) reject(new Error(err.message));
        resolve(results);
      });
    });
    return resultdb(200,transactionId);
  }
  catch(err){
    console.log(err);
    return resultdb(500,err);
  }
}

module.exports = {
  addServiceName,
  showClothSection,
  addClothType,
  showClothType,
  deleteSection,
  deleteClothType,
  placeLaundryOrder
};
