const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const orderService = require('../service/orderService');

// Get order history
async function getOrderHistory(req, res) {
    try {
        const user_id = req.body.user_id;
        let returndata = await orderService.getOrderHistory(user_id);
        return res.status(200).json(returndata);
    } catch (err) {
        console.log(err);
    }
}



router.post('/order/history', getOrderHistory);
module.exports = router;
