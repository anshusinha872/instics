var mysql = require('mysql');
config = {
	connectionLimit: 5,
	host: '165.232.184.76',
	user: 'dev',
	password: 'Anshu.@1237Ss',
	database: 'instinct_database',
	multipleStatements: true,
};
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
