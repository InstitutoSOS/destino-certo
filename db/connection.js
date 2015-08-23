var Sequelize = require('sequelize');

var sequelize = new Sequelize('dc', 'sa', 'Image15', {
  host: 'localhost',
  dialect: 'mssql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;