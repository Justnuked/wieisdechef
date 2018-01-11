var express = require('express');
var routes = express.Router();
var dbController = require('../controllers/db.controller');

//test routes
routes.get('/test', dbController.test);
routes.get('/dbtest', dbController.dbTest);

//Joining a meal
routes.get('/joinmeal', dbController.joinMeal);

//Being a chef and hosting a meal
routes.get('/hostmeal', dbController.hostMeal);

//Leaving a meal
routes.get('/leavemeal', dbController.leaveMeal);

//An overview on all data
routes.get('overview', dbController.showOverview);

//An overview of all the meals
routes.get('allmeals', dbController.showAllMeals);

routes.get('*', function(req, res, next) {
	res.status(404).json({Error: 'Endpoint nonexistent'}).end();
});

module.exports = routes;