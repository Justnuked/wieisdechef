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
		var query = 'INSERT INTO meals (name, price, maxPeople, image, description) VALUES (?, ?, ?, ?, ?)';
		db.query(query, [name, price, maxPeople, image, description], function(error, result, field) {
			if(error) {
				next(error);
			} else {
				res.status(200).json({status: "query successful"}).end();
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
		var querystring = 'INSERT INTO participants (dinnerId, studentId, extras) VALUES (?, ?, ?)';
		db.query(querystring,[dinnerid, studentid, extras], function(error, result, field) {
			if(error) {
				next(error);
			} else {
				res.status(200).json({status: "query successful"}).end();
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
		var query = 'INSERT INTO dinners (chefID, mealID, date) VALUES (?, ?, ?)';
		db.query(query, [chefID, mealID, date], function(error, result, field) {
			if(error) {
				next(error);
			} else {
				res.status(200).json({status: "query successful"}).end();
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
		var querystring = 'DELETE FROM participants WHERE studentId = ? AND dinnerId = ?;';
		db.query(querystring, [studentid, dinnerid], function(error, result, field) {
			if(error) {
				next(error);
			} else {
				res.status(200).json({status: "query successful"}).end();
			}
		});
	},
	
	/**
	* @author Kevin
	* @Description Get meal by meal ID. 
	*/
	getMeal(req, res, next) {
		var mealID = req.query.id;
		var query = 'SELECT * FROM meals WHERE id = ?';
		db.query(query, mealID,  function(error, results, field) {
			if(error) {
				next(error);
			} else {
				var meal = results[0];
				var result;
				if(meal.image == null) {
					result = {id: meal.id, name: meal.name, price: meal.price, maxPeople: meal.maxPeople, description: meal.description, image: null};
				} else {
					result = {id: meal.id, name: meal.name, price: meal.price, maxPeople: meal.maxPeople, description: meal.description, image: meal.image.toString()};
				}
				res.status(200);
				res.json(result); //Returns the first item in the array.
				res.end();
			}
		});
	},
	
	/**
	* @author Kevin
	* @Description Get dinner by dinner ID. 
	*/
	getDinner(req, res, next) {
		var dinnerID = req.query.id;
		var query = 'SELECT * FROM dinners WHERE id = ?';
		db.query(query, dinnerID, function(error, results, field) {
			if (error) {
				next(error);
			} else {
				res.status(200);
				res.json(results[0]);
				res.end();
			}
		});
	},
	
	/**
	* @author Kevin
	* @Description Gets a single dinner in the same format as overview, but by meal id. 
	*/
	getDetailedDinner(req, res, next) {
		var dinnerID = req.query.id;
		var query = 'SELECT d.id AS "DinnerID", s.username AS "Chef", m.name AS "Meal", (SUM(p.extras) + COUNT(p.studentId) + 1) AS "Participants", m.maxPeople AS "Max Participants", d.date AS "Date", d.mealId AS "MealID" FROM `students` s, `meals` m, `participants` p, `dinners` d WHERE s.id = d.chefId AND m.id = d.mealId AND d.id = p.dinnerId AND d.id = ? GROUP BY p.dinnerId';
		db.query(query, dinnerID, function(error, results, field) {
			if (error) {
				next(error);
			} else {
				res.status(200);
				res.json(results[0]);
				res.end();
			}
		});
	},
	
	/**
	* @author Casper
	* @Description Get dinners by userid.
	*/
	getDinnersByUser(req, res, next) {
		var userId = req.body.id;
		var query = 'SELECT dinnerId FROM participants WHERE studentId = ?';
		db.query(query, userId, function(error, results, field) {
			if (error) {
				next(error);
			} else {
				res.status(200);
				res.json(results[0]);
				res.end();
			}
		});
	},
	
	
	/**
	* @author Kevin
	* @Description Gets the amount of time a user has joined a certain dinner. 
	*/
	checkParticipants(req, res, next) {
		var studentId = req.query.studentid;
		var dinnerId = req.query.dinnerid;
		var query = "SELECT COUNT(*) FROM participants WHERE studentId = ? AND dinnerId = ?";
		db.query(query, [studentId, dinnerId], function(error, results, field) {
			if(error) {
				next(error);
			} else {
				res.status(200);
				res.json(results[0]);
				res.end();
			}
		});
	},
	
	/**
	 * @author: Kevin
	 * @description: Find dinner using the date and studentid
	 */
	findDinnerByDate(req, res, next) {
		var chefId = req.query.chefid;
		var date = req.query.date;
		var query = "SELECT * FROM dinners WHERE chefId = ? AND date = ?";
		db.query(query, [chefId, date], function(error, results, field) {
			if(error) {
				next(error);
			} else {
				res.status(200).json(results[0]).end();
			}
		});
	},
	
	/**
	* @author Thom
	* @Description Returns an overview containing: The chef who's cooking, what they're cooking on which date, and how many people are joining.
	*/
	showOverview(req, res, next) {
		var query = 'SELECT d.id AS "DinnerID", s.username AS "Chef", m.name AS "Meal", (SUM(p.extras) + COUNT(p.studentId)) AS "Participants", m.maxPeople AS "Max Participants", d.date AS "Date", d.mealId AS "MealID" FROM `students` s, `meals` m, `participants` p, `dinners` d WHERE s.id = d.chefId AND m.id = d.mealId AND d.id = p.dinnerId GROUP BY p.dinnerId';
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