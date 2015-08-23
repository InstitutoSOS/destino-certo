var Sequelize = require('sequelize');

module.exports = {};
module.exports.connection = require('./connection')


module.exports.tipoMaterial = require('./tipoMaterial')
module.exports.material = require('./material')
module.exports.pessoaJuridica = require('./pessoaJuridica')
module.exports.site = require('./site')
module.exports.user = require('./user')

module.exports.pacote = require('./pacote')
module.exports.pacoteLocationHistory = require('./pacoteLocationHistory')

module.exports.connection.sync();
