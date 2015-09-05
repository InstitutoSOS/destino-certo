var Sequelize = require('sequelize');
var connection = require('./connection.js');

var Material = connection.define('material', {
  name: {
    type: Sequelize.STRING(200), allowNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});



        
var TipoMaterial = require('./tipoMaterial');

Material.belongsTo(TipoMaterial, {onDelete: 'NO ACTION'})

module.exports = Material;