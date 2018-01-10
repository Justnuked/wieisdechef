var express = require('express');
var routes = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host : '',
	user : '',
	password : '',
	database : ''
});

connection.connect();

//routes


module.exports = routes;