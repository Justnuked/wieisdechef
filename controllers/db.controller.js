var db = require('../config/db');

module.exports = {
	
	joinMeal(req, res, next) {
		var studentid = req.body.studentid;
		var dinnerid = req.body.dinnerid;
		var querystring = 'INSERT INTO PARTICIPANTS(DINNERID, STUDENTID) VALUES ('+dinnerid+', '+studentid+')';
		db.query(querystring, function(error, results, field) {
			if(error) {
				next(error);
			} else {
			res.status(200);
			res.end();
			}
		});
	},
	
	hostMeal(req, res, next) {
		res.status(501);
		res.json({Error: 'not implicated yet'});
	},
	
	leaveMeal(req, res, next) {
		var studentid = req.body.studentid;
		var dinnerid = req.body.dinnerid;
		var querystring = 'DELETE FROM PARTICIPANTS WHERE studentid = ' +studentid+ ' AND dinnerid = ' +dinnerid+';';
		db.query(querystring, function(error, results, field) {
			if(error) {
				next(error);
			} else {
			res.status(200);
			res.end();
			}
		});
	},
	
	showOverview(req, res, next) {
		res.status(501);
		res.json({Error: 'not implicated yet'});
	},
	
	showAllMeals(req, res, next) {
		res.status(501);
		res.json({Error: 'not implicated yet'});
	},
	
	dbTest(req, res, next) {
		db.query('SELECT * FROM users', function(error, results, field) {
			if(error) {
				next(error);
			} else {
			res.status(200);
			res.json(results);
			res.end();
			}
		});
	},
	
	test(req, res, next) {
		res.status(200);
		res.json({Test: 'test'});
	}
}