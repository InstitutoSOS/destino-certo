var Reflux = require('reflux');

var loggedUserActions = Reflux.createActions([
    "login",
    "logout",
    "userLogged"
  ]);

module.exports = loggedUserActions;