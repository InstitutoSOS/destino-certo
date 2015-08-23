var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var users = require('./users.js');

publicRoutes();
authenticatedRoutes();
restrictedRoutes();

module.exports = router;



/***** private methods *****/

function publicRoutes() {
	router.post('/login', auth.login);
    router.get('/login', auth.login);
}

function authenticatedRoutes() {
	//crudRoutes('/api/v1/tasks', tasks);
}

function restrictedRoutes() {
	crudRoutes('/api/v1/admin/users', users);
}

function crudRoutes(path, controller, middleware) {
	middleware = middleware || function(req, res, next) {
		next();
	};

	var pathSingle = path + '/:id';
	router.get(path, middleware, controller.getAll);
	router.post(path, middleware, controller.create);
	router.get(pathSingle, middleware, controller.getOne);
	router.put(pathSingle, middleware, controller.update);
	router.delete(pathSingle, middleware, controller.remove);
}
