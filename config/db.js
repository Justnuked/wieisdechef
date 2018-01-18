//Inspired by: https://github.com/rschellius/mynodeserver/blob/master/config/db.improved.js

var mysql = require('mysql');

const connectionSettings = {
	host: '146.185.167.139',
	user: 'thom',
	password: 'te8jAceqy6tiLcGw',
	database: 'thom_wieisdechef'
};

const reconnectTimeout = 1000;
var connection;

function handleDisconnect() {
	connection = mysql.createConnection(connectionSettings);
	
	connection.connect(function(error) {
		if(error) {
			console.error('Error connecting to database ' + connectionSettings.database + ' on ' + connectionSettings.host + ": " + error.message);
			connection.end();
			setTimeout(handleDisconnect, reconnectTimeout);
		} else {
			console.log('Connected to database ' + connectionSettings.database + ' on ' + connectionSettings.host + ', state = ' + connection.state);
		}
	});
	connection.on('error', function(error) {
		if(error.code == 'ECONNRESET') {
			console.error('Connection state = ' + connection.state + ' - reconnecting');
			connection.end();
			handleDisconnect();
		} else {
			console.error('Connection error - database ' + connectionSettings.database + ' on ' + connectionSettings.host + ': ' + error.message);
			connection.end();
			handleDisconnect();
		}
	});
}

handleDisconnect();

module.exports = connection;