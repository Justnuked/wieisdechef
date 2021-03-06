var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes = require('./api/routes');
var account = require('./api/account');
var favicon = require('serve-favicon');
var jwt = require('./controllers/authentication.js');

var app = express();

const port = process.env.PORT || 3000;

app.use(favicon(__dirname + '/images/favicon.ico'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(logger('dev'));

/**
 * @author: Kevin
 * @description: Adds JSON content type to all.
 */
app.use('*', function(req, res, next){
	res.contentType('application/json');
	next();
});

/**
 * @author: Thom
 * @description: Checks if user is logged in before accessing everything behind /session/
 */
app.use('/api/session/*', function(req, res, next){
	
	console.log("VALIDATE TOKEN")

    var token = (req.header('X-Access-Token')) || '';

    jwt.decodeToken(token, function (err, payload) {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
			res.end();
        } else {
            next();
        }
    });
});

//Set the file endpoints
app.use('/api/session', routes);
app.use('/api', account);

/**
 * @author: Kevin
 * @description: Returns a 400 error for all non existing endpoints
 */
app.use('*', function(req, res, next){
	res.status(400);
	res.json({Error: 'No matching endpoint'});
	res.end();
});

/**
 * @author: Kevin
 * @description: Returns a 404 error for everything else
 */
app.use('*', function(err, req, res, next){
	console.log('Error: ' + err);
	res.status(404).json({error: err}).end();
});

app.listen(port, function() {
	console.log('Server listens on port ' + port);
});

module.exports = app;