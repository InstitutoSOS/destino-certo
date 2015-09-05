var Sequelize = require('sequelize');
var connection = require('./connection.js');

var Pacote = connection.define('pacote', {
  uuid: {
    type:  Sequelize.UUID, allowNull: false
  },
   
  peso: {
    type: Sequelize.DECIMAL(9, 3), allowNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


var Material = require('./material');
var PessoaJuridica = require('./pessoaJuridica');

Pacote.belongsTo(Material, {onDelete:'NO ACTION'})
Pacote.belongsTo(PessoaJuridica, {as: 'produtor', onDelete:'NO ACTION'})
Pacote.belongsTo(PessoaJuridica, {as: 'reciclador', onDelete:'NO ACTION'})
Pacote.belongsTo(PessoaJuridica, {as: 'atribuidoA', onDelete:'NO ACTION'})





module.exports = Pacote;