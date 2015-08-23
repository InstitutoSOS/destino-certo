var jwt = require('jsonwebtoken');
//var utils = require('../utils');
var config = require('config');

var User = require('../db/').user;



module.exports = {
	authenticate: authenticate,
	authorizeAdmin: authorizeAdmin
};

function authenticate(req, res, next) {
	var token = req.headers['x-access-token'] || '';

	if (token == '') {
		res.sendError(401, 'Invalid token');
	} else {
		try {
			var salt = config.get('security.token.salt');
			var decoded = jwt.verify(token, salt);
 
			if (decoded.expires <= Date.now()) {
				res.sendError(400, 'Token expired');
			} else {
	 			User.findOne({ where: { email: decoded.email }}).then(function(user) {
					if (user) {
						req.user = user;
						next();
					} else {
						res.sendError(401, 'Invalid user');
					}
				}).catch(function(err){ 
                    res.sendError(500, 'Something went wrong', err);
                });
			}
		} catch (e) {
			res.sendError(500, 'Something went wrong', e);
		}
	}
};

function authorizeAdmin(req, res, next) {
	if (req.user.admin) {
		next();
	} else {
		res.sendError(403, 'Access denied');
	}
};
