var Sequelize = require('sequelize');
var connection = require('./connection.js');

var PessoaJuridica = connection.define('pessoaJuridica', {
  name: {
    type: Sequelize.STRING(200), allowNull: false
  },
  cnpj: {
    type: Sequelize.STRING(22), allowNull: false
  },
  tipo: {type: Sequelize.ENUM('Cooperativa', 'Reciclador', 'Gerador'), allowNull: false  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


module.exports = PessoaJuridica;