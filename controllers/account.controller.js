var dbController = require('../controllers/db.controller');
var db = require('../config/db');
var jwt = require('../controllers/authentication.js');


module.exports = {
	
	/**
	@author Thom
	@Description logs the user in and returns the JWT token
	**/
	login(req, res, next) {
		var userName = req.body.username;
		var password = req.body.password;
		console.log(userName);
		console.log(password);	
		
		if(userName != null && password != null){
		var querystring = 'SELECT COUNT(username) AS username FROM students WHERE username = ? AND password = ?';
		db.query(querystring, [userName, password], function(error, results, field) {
			if(error) {
				next(error);
			} else {
			if(results[0].username == 1){
				res.status(200).json({"token" : jwt.encodeToken(userName), "username" : userName});
			} else{
				res.status(401);
			}
			
			res.end();
			}
		});
		}
	},
	
	/**
	@author Thom
	@Description registers a new user in the db
	**/
	register(req, res, next) {
		
		var userName = req.body.username;
		var password = req.body.password;

		if(userName != null && password != null){
		var querystring = 'INSERT INTO STUDENTS(username, password) VALUES (?, ?)';
		db.query(querystring, [userName, password], function(error, results, field) {
			if(error) {
				next(error);
			} else {
			res.status(200);
			res.json({Message: 'Account created. Happy eating!'});
			res.end();
			}
		});
		} else{
			res.status(502);
			res.json({error: 'Something went wrong'})
			res.end();
		}
	}
}