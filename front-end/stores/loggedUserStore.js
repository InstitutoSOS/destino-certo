var Reflux = require('reflux');
var loggedUserActions = require('../actions/loggedUserActions');
var request = require('superagent');

var loggedUserStore = Reflux.createStore({

    // Initial setup
    init: function() {
       this.listenTo(loggedUserActions.login, this.performLogin);
    },

    // Callback
    performLogin: function(loginData) {
        
        request
          .post('/api/v1/login')
          .send(loginData)
          .set('Accept', 'application/json')
          .end(function(err, res){
                if (err) {
                    data.token = null;
                    data.user = null;
                    data.errorMsg = res.body.message;
                    this.trigger(data);
                } else {
                    localStorage.setItem('token', res.body.token);
                    data.token = res.body.token;
                    data.errorMsg = null;
                    data.user = getLoggedUser();
                    this.trigger(data);
                }
          }.bind(this));
        
    },
    
    getLoggedUser: function() {
       return data.user;
    },
    
    getData: function() {
        return data;    
    }

});

var data = {
    token: localStorage.getItem('token'),
    user: null,
    errorMsg:null,
}

data.user = getLoggedUser();


 function getLoggedUser() {
        if (data.token) {
            var a = data.token.split(".");
            var uHeader = atob(a[0]);
            var uClaim = atob(a[1]);
            return lerComponenteToken(a[1]).user;
        } else {
            return null;
        }
}


function lerComponenteToken(comp) {
    return JSON.parse(decodeURIComponent(escape(( atob(comp) ))));
}

module.exports = loggedUserStore;