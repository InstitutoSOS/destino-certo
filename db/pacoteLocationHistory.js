var Sequelize = require('sequelize');
var connection = require('./connection.js');

var Site = require('./site');
var Pacote = require('./pacote');


PacoteLocationHistory = connection.define('pacote_location_history', {}, {
    timestamps: false
});

Pacote.belongsToMany(Site, { through: PacoteLocationHistory });

module.exports = PacoteLocationHistory;