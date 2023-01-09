const express = require('express');
const app = express();
const util = require('util');
const mysql = require('mysql');
const routes = require('../routes');
const userControllerRoute = require('../routes/controller/userController');

app.use(userControllerRoute);
app.use(express.json());
app.listen(3000, () => {
	console.log('server started at 3000');
});
