const express = require('express');
const MysqlPool = require('../../app');
const router = express.Router();
const mailservice = require('../service/mailService');
// Get order history

async function sendMail(req, res) {
    console.log("mail controller");
    console.log(req.body);
    try {
        // const user_id = req.body.user_id;
        let returndata = await mailservice.sendMail(req.body);
        return res.status(200).json(returndata);
    } catch (err) {
        console.log(err);
    }
}
router.post('/mail', sendMail);
module.exports = router;
