var dbController = require('../controllers/db.controller');
var db = require('../config/db');

module.exports = {
	
	login(req, res, next) {
		res.status(501);
		res.json({Error: 'not implicated yet'});
	},
	
	register(req, res, next) {
		res.status(501);
		res.json({Error: 'not implicated yet'});
	},
	
	// req : userid, dinnerid
	joinMeal(req, res, next) {
		console.log(req.body.studentid, req.body.dinnerid);
		dbController.joinMeal(req, res, next);
	},
	
	// req : userid, dinnerid
	leaveMeal(req, res, next){
		
		console.log(req.body.studentid, req.body.dinnerid);
		dbController.leaveMeal(req, res, next);
	}
}