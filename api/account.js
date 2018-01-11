var express = require('express');
var routes = express.Router();
var accountController = require('../controllers/account.controller');

routes.post('/login', accountController.login);

routes.post('/register', accountController.register);

routes.post('/joinmeal', accountController.joinMeal);

routes.post('/leavemeal', accountController.leaveMeal);

module.exports = routes;