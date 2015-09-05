var User = require('../db').user;

module.exports = require('./crud').makeRoutesFor(User, {
	preQuery: function(req, res, query) {
		//query.select('-hashedPassword -salt');
        query.attributes =  ['name', 'email', 'id', 'admin', 'pessoaJuridicaId'];
        return query;
    },
    preUpdate: function(req, res, next, theQuery) {
        if (req.body.password == "") {
            delete req.body.password;
        }
        return theQuery;
    }
});
