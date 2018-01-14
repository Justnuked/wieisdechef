var db = require('../config/db');

module.exports = {
	
	addMeal(req, res, next) {
		var name = req.body.name;
		var price = req.body.price;
		var maxPeople = req.body.maxPeople;
		var image = req.body.image;
		var description = req.body.description;
		var query = 'INSERT INTO meals (name, price, maxPeople, image, description) VALUES ("' + name + '", ' + price + ', ' + maxPeople + ', "' + image + '", "' + description + '")';
		db.query(query, function(error, result, field) {
			if(error) {
				next(error);
			} else {
				res.status(200).end();
			}
		});
	},
	
	joinMeal(req, res, next) {
		var studentid = req.body.studentid;
		var dinnerid = req.body.dinnerid;
		var extras = req.body.extras;
		var querystring = 'INSERT INTO PARTICIPANTS(DINNERID, STUDENTID, EXTRAS) VALUES ('+dinnerid+', '+studentid+', '+extras+')';
		db.query(querystring, function(error, result, field) {
			if(error) {
				next(error);
			} else {
				res.status(200).end();
			}
		});
	},
	
	hostMeal(req, res, next) {
		var chefID = req.body.chefID;
		var mealID = req.body.mealID;
		var date = req.body.date; //Date in format "YYYY-MM-DD HH:MM:SS"
		var query = 'INSERT INTO dinners (chefID, mealID, date) VALUES (' + chefID + ', ' + mealID + ', "' + date + '")';
		db.query(query, function(error, result, field) {
			if(error) {
				next(error);
			} else {
				res.status(200).end();
			}
		});
	},
	
	leaveMeal(req, res, next) {
		var studentid = req.body.studentid;
		var dinnerid = req.body.dinnerid;
		var querystring = 'DELETE FROM PARTICIPANTS WHERE studentid = ' +studentid+ ' AND dinnerid = ' +dinnerid+';';
		db.query(querystring, function(error, result, field) {
			if(error) {
				next(error);
			} else {
				res.status(200).end();
			}
		});
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
		var query = 'SELECT st.username AS `Kok`, m.name AS `Maaltijd`, date, (COUNT(p.studentId) + 1)  `Hoeveel eters?`, m.Id AS `mealId` FROM `dinners` d JOIN `students` st  ON st.id=d.chefId JOIN `meals` m ON m.id = d.mealId JOIN `participants` p ON p.dinnerId = d.id GROUP BY d.date';
		db.query(query, function(error, results, field) {
			if(error) {
				next(error);
			} else {
				res.status(200);
				res.json(results);
				res.end();
			}
		});
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