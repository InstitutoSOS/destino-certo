var Sequelize = require('sequelize');
var connection = require('./connection.js');
var crypto = require('crypto');

var User = connection.define('user', {
  name: {
    type: Sequelize.STRING(200), allowNull: false
  },
  email: {
    type: Sequelize.STRING(200), allowNull: false
  },
  password_hash: {type: Sequelize.STRING, allowNull: false  },
  salt: {type: Sequelize.STRING,allowNull: false },
  admin: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
  password: {
    type: Sequelize.VIRTUAL,
    set: function (val) {
       this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
       this.setDataValue('salt', makeSalt());
       this.setDataValue('password_hash', encryptPassword(this.salt, val));
     },
     validate: {
        isLongEnough: function (val) {
          if (val.length < 6) {
            throw new Error("Please choose a longer password")
         }
      }
    }
  }
}, {
  freezeTableName: true,
  instanceMethods: {
    authenticate: function(pasword) { return encryptPassword(this.salt, pasword) == this.password_hash; }
  }  
  // Model tableName will be the same as the model name
});


function makeSalt() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
}

function encryptPassword(salt, password) {
    if (!password) {
        return '';
    }

    try {
        var encrypted = crypto.createHmac('sha1', salt).update(password).digest('hex');
        return encrypted;
    } catch (err) {
        return '';
    }
}
        
var PessoaJuridica = require('./pessoaJuridica');

User.belongsTo(PessoaJuridica)

module.exports = User;