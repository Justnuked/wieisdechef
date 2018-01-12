var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require('./api/routes');
var account = require('./api/account');
var favicon = require('serve-favicon');

var app = express();

const port = process.env.PORT || 3000;

app.use(favicon(__dirname + '/images/favicon.ico'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(logger('dev'));

//Add JSON content type to all.
app.use('*', function(req, res, next){
	res.contentType('application/json');
	next();
});

app.use('/api/session', routes);
app.use('/api', account);

app.use('*', function(req, res, next){
	res.status(400);
	res.json({Error: 'No matching endpoint'});
	res.end();
});

app.use('*', function(err, req, res, next){
	console.log('Error: ' + err);
	res.status(404).json({error: err}).end();
});

app.listen(port, function() {
	console.log('Server listens on port ' + port);
});

module.exports = app;