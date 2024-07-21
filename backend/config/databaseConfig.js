var mysql = require('mysql');
config = {
	connectionLimit: 5,
	host: '165.22.218.106',
	user: 'dev',
	password: 'Anshu.@1237Ss',
	database: 'instinct_database',
	multipleStatements: true,
};

//old DATABSE
// config = {
// 	connectionLimit: 5,
// 	host: 'mysql.cm1q4b6bmdpr.ap-south-1.rds.amazonaws.com',
// 	user: 'admin',
// 	password: 'anshu123',
// 	database: 'instinct_database',
// 	multipleStatements: true,
// };

//  config = {
// 	connectionLimit: 5,
// 	host: 'instincts-do-user-13309295-0.b.db.ondigitalocean.com',
// 	user: 'doadmin',
// 	password: 'AVNS_IxOdeG6N2c2mvtU-VK4',
// 	database: 'instinct_db',
// 	multipleStatements: true,
// };

var connection = mysql.createConnection(config);
connection.connect(function (err) {
	if (err) {
		console.log('error connecting:' + err.stack);
	}
	else {
		console.log('connected successfully to DB.');
	}
});
module.exports = {
	connection: mysql.createConnection(config),
};
