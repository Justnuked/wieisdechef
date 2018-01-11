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
}