var express = require('express');
var routes = express.Router();
var dbController = require('../controllers/db.controller');

/**
 * @author: Kevin
 * @description: Joining a meal
 */
routes.post('/joinmeal', dbController.joinMeal);

/**
 * @author: Kevin
 * @description: Being a chef and hosting a meal
 */
routes.post('/hostmeal', dbController.hostMeal);

/**
 * @author: Kevin
 * @description: Leaving a meal
 */
routes.post('/leavemeal', dbController.leaveMeal);

/**
 * @author: Kevin
 * @description: Adds a new meal
 */
routes.post('/addmeal', dbController.addMeal);

/**
 * @author: Kevin
 * @description: Return a single meal
 */
routes.get('/getmeal', dbController.getMeal);

/**
 * @author: Kevin
 * @description: Return a single dinner
 */
routes.get('/getdinner', dbController.getDinner);

/**
 * @author: Kevin
 * @description: Return a more detailed dinner
 */
routes.get('/getdetaileddinner', dbController.getDetailedDinner);

/**
 * @author: Kevin
 * @description: An overview on all data
 */
routes.get('/overview', dbController.showOverview);

/**
 * @author: Kevin
 * @description: An overview of all the meals
 */
routes.get('/allmeals', dbController.showAllMeals);

/**
 * @author: Kevin
 * @description: Checks if the student has joined a certain dinner
 */
routes.get('/checkparticipants', dbController.checkParticipants);

/**
 * @author: Kevin
 * @description: Returns a 400 error for all non existing endpoints
 */
routes.get('*', function(req, res, next) {
	res.status(404).json({Error: 'Endpoint nonexistent'}).end();
});

module.exports = routes;