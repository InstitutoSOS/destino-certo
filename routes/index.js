var express = require('express');
var router = express.Router();

var auth = require('./auth');
var users = require('./users');
var pessoaJuridica = require('./pessoaJuridica');
var tipoMaterial = require('./tipoMaterial');
var material = require('./material');


publicRoutes();
authenticatedRoutes();
restrictedRoutes();

module.exports = router;



/***** private methods *****/

function publicRoutes() {
	router.post('/api/v1/login', auth.login);
}

function authenticatedRoutes() {
	//crudRoutes('/api/v1/tasks', tasks);
}

function restrictedRoutes() {
	crudRoutes('/api/v1/private/admin/users', users);
    crudRoutes('/api/v1/private/admin/pessoaJuridica', pessoaJuridica);
    crudRoutes('/api/v1/private/admin/tipoMaterial', tipoMaterial);
    crudRoutes('/api/v1/private/admin/material', material);
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
