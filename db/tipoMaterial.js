var Sequelize = require('sequelize');
var connection = require('./connection.js');

var TipoMaterial = connection.define('tipoMaterial', {
  name: {
    type: Sequelize.STRING(200), allowNull: false
  },
  simpleName: {
      type: Sequelize.STRING(200), allowNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


module.exports = TipoMaterial;