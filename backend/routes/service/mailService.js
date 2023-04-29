const MysqlPool = require('../../app');
const config = require('../../config/databaseConfig.js');
const util = require('util');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anshusinha872@gmail.com',
        pass: 'eczghgoighhisxty'
    }
});
const resultdb = (statusCode, data = null) => {
	return {
		statusCode: statusCode,
		data: data,
	};
};

let sendMail = async (user_id) => {
	try {
    const mailOptions = {
        from: "anshusinha872@gmail.com",
        to: 'anshikaanshika103@gmail.com',
        subject: `Message from Anshu`,
        text: "hello world"
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return resultdb(500, error);
        } else {
            console.log('Email sent: ' + info.response);
            return resultdb(200, info.response);
        }
    });
	} catch (err) {
		console.log(err);
		return resultdb(500, err);
	}
};
module.exports = {
	sendMail,
};
