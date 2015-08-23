var Sequelize = require('sequelize');
var connection = require('./connection.js');

var Site = connection.define('site', {
  cep: {
    type: Sequelize.STRING(10), allowNull: false
  },
  logradouro: {
    type: Sequelize.STRING(200), allowNull: false
  },
  numero: {
    type: Sequelize.STRING(20), allowNull: false
  },
  complemento: {
    type: Sequelize.STRING(20), allowNull: true
  },
  bairro: {
    type: Sequelize.STRING(50), allowNull: false
  },
  cidade: {
    type: Sequelize.STRING(50), allowNull: false
  },
  estado: {
    type: Sequelize.STRING(50), allowNull: false
  },
  lat: {
      type: Sequelize.DECIMAL(10, 6) , allowNull: false
  },
  lng: {
      type: Sequelize.DECIMAL(10, 6) , allowNull: false
  }
  
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});



        
var PessoaJuridica = require('./pessoaJuridica');

Site.belongsTo(PessoaJuridica)

module.exports = Site;