
module.exports = {
	makeRoutesFor: makeRoutesFor
};



/***** public methods *****/

function makeRoutesFor(Model, callbacks) {

	var service = {
		getAll: getAll,
		getOne: getOne,
		create: create,
		update: update,
		remove: remove
	};

	return service;



	/***** public methods *****/

	function getAll(req, res, next) {
        var theQuery = preQuery(req, res, {});
		var query = Model.findAll(theQuery);
		
		executeQuery(query, res, next);
	}

	function getOne(req, res, next) {
        var theQuery = preQuery(req, res, { where: {id: req.params.id }});
		var query = Model.findOne(theQuery);
        
		executeQuery(query, res, next);
	}

	function create(req, res, next) {
		if (callbacks && callbacks.preCreate) {
			callbacks.preCreate(req, res, next);
		}

		var query = Model.create(req.body);
		
        executeQuery(query, res, next);
	}

	function update(req, res, next) {
        var theQuery = { where: {id: req.params.id }};
        if (callbacks && callbacks.preUpdate) {
			theQuery = callbacks.preUpdate(req, res, next, theQuery);
		}

		var query = Model.findOne(theQuery);
        query.then(function(result) {
            if(result) {
                executeQuery(result.updateAttributes(req.body), res, next);
            } else {
                sendDocument(res, result);
            }
        }).catch(function(error) {
            return next(error);
        });
	}

	function remove(req, res, next) {
		if (callbacks && callbacks.preRemove) {
			callbacks.preRemove(req, res, next);
		}

		var query = Model.destroy({ where: {id: req.params.id }});
		executeQuery(query, res, next);
	}



	/***** private methods *****/

    function executeQuery(query, res, next) {
        query.then(function(result) {
			sendDocument(res, result);
		}).catch(function(error) {
            if (error.name == 'SequelizeValidationError') {
                sendDocument(res, {message: 'Erro de validação', errors: error.errors})
            } else {
                return next(error);
            }
        });
    }
    
    
	function preQuery(req, res, query) {
		if (callbacks && callbacks.preQuery) {
			query = callbacks.preQuery(req, res, query);
		}
		return query;
	}

	function sendDocument(res, result) {
		if (result) {
			res.json(result);
		} else {
			res.sendError(404, 'Document not found');
		}
	}
}
