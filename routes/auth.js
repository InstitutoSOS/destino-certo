var jwt = require('jsonwebtoken');
var config = require('config');
var moment = require('moment');

var User = require('../db').user;

module.exports = {
	login: login
};



/***** public methods *****/

function login(req, res) {
	var email = req.body.email || '';
	var password = req.body.password || '';

	if (email == '') {
		denyRequest(res, 'Email não informado');
	} else if (password == '') {
		denyRequest(res, 'Senha não informada');
	} else {
		User.findOne({ where: { email: email }}).then(function(user) {
			//console.log(user, user.authenticate(password))
			if (user && user.authenticate(password)) {
				res.json(generateToken(user));
			} else {
				denyRequest(res);
			}
		}).catch(function(error) {
            denyRequest(res);
        });
	}
}
 


/***** private methods *****/

function denyRequest(res, message) {
	message = message || 'Credenciais inválidas';
	res.sendError(401, message);
}

function generateToken(user) {
	var salt = config.get('security.token.salt');
	var daysToExpire = config.get('security.token.daysToExpire');

	var expires = moment().add(daysToExpire, 'days');
	var tokenParams = {
		expires: expires,
        user: { name: user.name, email: user.email, admin: user.admin, pessoaJuridicaId: user.pessoaJuridicaId }
	};
    console.log(tokenParams);
    console.log(JSON.stringify(tokenParams));
	var token = jwt.sign(JSON.stringify(tokenParams), salt);
    delete user.password_hash;
    delete user['salt'];
	return {
		token: token
	};
}
