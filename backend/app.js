const express = require('express');
const app = express();
const util = require('util');
const https = require('https');
const path = require('path');
const fs = require('fs');
const fileupload = require('express-fileupload');
// const mysql = require('mysql');
const routes = require('./routes');
const { dirname } = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware/middleware');
const morgan = require('morgan');
var bodyParser = require('body-parser');

// const { options } = require('pg/lib/defaults');
app.use(cors());
// const userControllerRoute = require('../routes/controller/userController');
const sercretKey = "AnshuSinha";
// app.use('/', (req, res, next) => {
// 	res.send('hello world');
// });
// console.log(__dirname);
// const sslServer = https.createServer(
// 	{
// 		key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
// 		cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
// 	},
// 	app
// );
// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:4200/');
// 	// update to match the domain you will make the request from
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	);
// 	next();
// });



const corsOptions = {
	origin: '*',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(
	express.json({
		limit: '2mb',
		verify: (req, res, buf) => {
			req.rawBody = buf.toString();
		},
	})
);
app.use(bodyParser.json());
// app.post('/webHook/success', (req, res) => {
// 	// const data = req.body;
// 	// console.log(data);
// 	console.log(req.body);
// 	res.status(200).send('Webhook received');
// });
app.use(cors(corsOptions)); // Use this
app.use(express.json({ limit: '50mb' }));
app.use(
	fileupload({
		limits: { fileSize: 50 * 1024 * 1024 },
	})
);
// app.use(middleware);

app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);
const userController = routes.userController;
const pdfController = routes.pdfController;
const orderController = routes.orderController;
const cartController = routes.cartController;
const webHookController = routes.cashFreeWebHook;
app.use(userController);
app.use(pdfController);
app.use(orderController);
app.use(cartController);
app.use(webHookController);
app.listen(3443, () => console.log('server started at 3443')); //localhost:3443

// app.listen(3000, () => {
// 	console.log('server started at 3000');
// });
// for deployed server
// var options = {
// 	key: fs.readFileSync('/etc/letsencrypt/live/instincts.co.in/privkey.pem'),
// 	cert: fs.readFileSync('/etc/letsencrypt/live/instincts.co.in/fullchain.pem'),
// };
// let server = https.createServer(options, app);
// server.listen(3443, () => {
//     console.log('server started at 3443');
// });
