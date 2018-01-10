var express = require('express');
var routes = express.Router();
//var mysql = require('mysql');

//var connection = mysql.createConnection({
//	host : '',
//	user : '',
//	password : '',
//	database : ''
//});

//connection.connect();

//routes

routes.get('/test', function(req, res) {
	res.status(200);
	res.json({'Test' : 'test'});
});

module.exports = routes;