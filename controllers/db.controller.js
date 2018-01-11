var db = require('../config/db');

module.exports = {
	
	joinMeal(req, res, next) {
		res.status(501);
		res.json({Error: 'not implicated yet'});
	},
	
	hostMeal(req, res, next) {
		res.status(501);
		res.json({Error: 'not implicated yet'});
	},
	
	leaveMeal(req, res, next) {
		res.status(501);
		res.json({Error: 'not implicated yet'});
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