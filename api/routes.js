var express = require('express');
var routes = express.Router();
var dbController = require('../controllers/db.controller');

//Joining a meal
routes.post('/joinmeal', dbController.joinMeal);

//Being a chef and hosting a meal
routes.post('/hostmeal', dbController.hostMeal);

//Leaving a meal
routes.post('/leavemeal', dbController.leaveMeal);

//Adds a new meal
routes.post('/addmeal', dbController.addMeal);

//Return a single meal
routes.get('/getmeal', dbController.getMeal);

//An overview on all data
routes.get('/overview', dbController.showOverview);

//An overview of all the meals
routes.get('/allmeals', dbController.showAllMeals);

//Get all nonexistent endpoints
routes.get('*', function(req, res, next) {
	res.status(404).json({Error: 'Endpoint nonexistent'}).end();
});

module.exports = routes;