const express = require('express');
const app = express();
const util = require('util');
const https = require('https');
const path = require('path');
const fs = require('fs');
// const mysql = require('mysql');
const routes = require('../routes');
const { dirname } = require('path');
// const userControllerRoute = require('../routes/controller/userController');

// app.use('/', (req, res, next) => {
// 	res.send('hello world');
// });
// console.log(__dirname);
const sslServer = https.createServer(
	{
		key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
		cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
	},
	app
);
// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', 'https://instincts.co.in/');
// 	// update to match the domain you will make the request from
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	next();
// });
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this 
app.use(express.json());
const userController = routes.userController;
app.use(userController);
sslServer.listen(3443, () => console.log('server started at 3443'));
// app.listen(3000, () => {
// 	console.log('server started at 3000');
// });
