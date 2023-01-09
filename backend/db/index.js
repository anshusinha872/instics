
const express = require('express');
const app = express();
const util = require('util');
const mysql = require('mysql');
const routes = require('../routes');
const userControllerRoute = require('../routes/controller/userController');
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	// update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use(userControllerRoute);
app.use(express.json());
app.listen(3000, () => {
	console.log('server started at 3000');
});
