var User = require('../db').user;

module.exports = require('./crud').makeRoutesFor(User, {
	preQuery: function(req, res, query) {
		//query.select('-hashedPassword -salt');
        query.attributes =  ['name', 'email', 'id', 'admin', 'pessoaJuridicaId'];
        return query;
    }
});
