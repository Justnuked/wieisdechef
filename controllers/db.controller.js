var db = require('../config/db');

module.exports = {
	
	/**
	* @author Kevin
	* @Description Adds a meal to the database. Requires names, price per person, maximum amount of eaters, optionally image of the meal and description.
	*/
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

	/**
	* @author Casper
	* @Description Joining meal functionality. Request contains studentid, dinnerid, and the amount of extras they're bringing. Adds records to participants table.
	*/
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
	
	/**
	* @author Kevin
	* @Description Student hosts a meal. Requires the meal to be in the database before dinner can be hosted. Date is also mandatory.
	*/
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
	
	/**
	* @author Casper
	* @Description Leaving meal functionality. Request contains studentid and dinnerid. Deletes from participants table.
	*/
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
	
	/**
	* @author Kevin
	* @Description Get meal by meal ID. 
	*/
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
	
	/**
	* @author Thom
	* @Description Returns an overview containing: The chef who's cooking, what they're cooking on which date, and how many people are joining.
	*/
	showOverview(req, res, next) {
		var query = 'SELECT st.username AS `Kok`, m.name AS `Maaltijd`, date, (COUNT(p.studentId) + 1 + p.extras)  `Hoeveel eters?`, m.Id AS `mealId` FROM `dinners` d JOIN `students` st  ON st.id=d.chefId JOIN `meals` m ON m.id = d.mealId JOIN `participants` p ON p.dinnerId = d.id GROUP BY d.date';
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
	
	/**
	* @author Kevin
	* @Description Returns all meals.
	*/
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