var express = require('express');
var routes = express.Router();
var accountController = require('../controllers/account.controller');

routes.post('/login', accountController.login);

routes.post('/register', accountController.register);

module.exports = routes;