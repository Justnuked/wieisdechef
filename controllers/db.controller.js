var db = require('../config/db');

function executePostQuery(error, results, field) {
	if(error) {
		next(error);
	} else {
		res.status(200).end();
	}
}

module.exports = {
	
	addMeal(req, res, next) {
		var name = req.body.name;
		var price = req.body.price;
		var maxPeople = req.body.maxPeople;
		var image = req.body.image;
		var description = req.body.description;
		var query = 'INSERT INTO meals (name, price, maxPeople, image, description) VALUES ("' + name + '", ' + price + ', ' + maxPeople + ', "' + image + '", "' + description + '")';
		db.query(query, executePostQuery);
	},
	
	joinMeal(req, res, next) {
		var studentid = req.body.studentid;
		var dinnerid = req.body.dinnerid;
		var querystring = 'INSERT INTO PARTICIPANTS(DINNERID, STUDENTID) VALUES ('+dinnerid+', '+studentid+')';
		db.query(querystring, executePostQuery);
	},
	
	hostMeal(req, res, next) {
		var chefID = req.body.chefID;
		var mealID = req.body.mealID;
		var date = req.body.date; //Date in format "YYYY-MM-DD HH:MM:SS"
		var query = 'INSERT INTO dinners (chefID, mealID, date) VALUES (' + chefID + ', ' + mealID + ', "' + date + '")';
		db.query(query, executePostQuery);
	},
	
	leaveMeal(req, res, next) {
		var studentid = req.body.studentid;
		var dinnerid = req.body.dinnerid;
		var querystring = 'DELETE FROM PARTICIPANTS WHERE studentid = ' +studentid+ ' AND dinnerid = ' +dinnerid+';';
		db.query(querystring, executePostQuery);
	},
	
	//Used like ...session/getmeal?id=1
	getMeal(req, res, next) {
		var mealID = req.query.id;
		var query = 'SELECT * FROM meals WHERE id = ' + mealID;
		db.query(query, function(error, results, field) {
			if(error) {
				next(error);
			} else {
				res.status(200);
				res.json(results[0]); //Returns the first item in the array.
				res.end();
			}
		});
	},
	
	showOverview(req, res, next) {
		res.status(501);
		res.json({Error: 'not implemented yet'});
	},
	
	showAllMeals(req, res, next) {
		var query = 'SELECT * FROM meals';
		db.query(query, function(error, results, field) {
			if(error) {
				next(error);
			} else {
				res.status(200);
				res.json(results); 
				res.end();
			}
		});
	}
}