var Sequelize = require('sequelize');

var sequelize = new Sequelize('dc', 'sa', 'Image15', {
  host: '127.0.0.1',
  dialect: 'mssql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;