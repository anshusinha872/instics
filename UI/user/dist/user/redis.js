const asyncRedis = require('async-redis');
const client = asyncRedis.createClient(6379, '127.0.0.1');//(6379, '134.122.104.124');
client.on("error", function (err) {
    console.log("Error " + err);
});
client.on('connect', function(){
    console.log('Connected to Redis');
});
const localClient = asyncRedis.createClient(6379, '127.0.0.1');
localClient.on('connect', function(){
    console.log('Connected to Redis');
	module.exports = {client, localClient};
});
localClient.on("error", function (err) {
    console.log("Error " + err);
});



