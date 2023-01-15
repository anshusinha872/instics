var mysql = require('mysql');
config = {
	connectionLimit: 5,
	host: 'mysql.cm1q4b6bmdpr.ap-south-1.rds.amazonaws.com',
	user: 'admin',
	password: 'anshu123',
	database: 'instinct_database',
	multipleStatements: true,
};
var connection = mysql.createConnection(config); 
connection.connect(function (err) {
	if (err) {
		console.log('error connecting:' + err.stack);
	}
	console.log('connected successfully to DB.');
});

module.exports = {
	connection: mysql.createConnection(config),
};
