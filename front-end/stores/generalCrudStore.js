var Reflux = require('reflux');
var request = require('superagent');
var loggedUserStore = require('./loggedUserStore');


function createStore(endpoint) {
    
    
    var generalCrudActions = Reflux.createActions([
        "load",
        "startAdd",
        "startEdit",
        "delete",
        "resetState",
        "save"
    ]);


    var generalCrudStore = Reflux.createStore({

        data: {loaded: false, editing: false},
        listenables: generalCrudActions,
        
        onLoad: function(data) {
            request
              .get(endpoint)
              .set('Accept', 'application/json')
              .set('x-access-token', loggedUserStore.getData().token)
              .end(function(err, res){
                    if (err) {
                        this.data.errorMsg = res.body.message;
                        this.trigger(this.data);
                    } else {
                        this.data.list = res.body;
                        this.data.loaded = true;
                        this.trigger(this.data);
                    }
              }.bind(this));
        },
        

        onStartAdd: function(data) {
            this.data.editing = true;
            this.data.edited = {};
            this.trigger(this.data);
        },
        
        onStartEdit: function(data) {
            this.data.editing = true;
            this.data.edited = data;
            this.trigger(this.data);
        },
        
        onDelete: function(data) {
        },
        
        getData: function() {
            return this.data;    
        },
        
        onResetState: function() {
            this.data.editing = false;
            this.data.edited = null;
            this.trigger(this.data);
            this.data.errorMsg = null;
            this.data.errors = null;
        },
        
        onSave: function(data) {
           
            var req = null;
            if (data.id && data.id != 0) {
                req = request
                  .put(endpoint + '/' + data.id);
            } else {
                req = request.post(endpoint);
            }
            req.set('Accept', 'application/json')
              .set('x-access-token', loggedUserStore.getData().token)
              .send(data)
              .end(function(err, res){
                    if (err) {
                        this.data.errorMsg = res.body.message;
                        this.trigger(this.data);
                    } else {
                        if (res.body.message != null) {
                            this.data.errorMsg = res.body.message;
                            this.data.errors = res.body.errors;
                            this.trigger(this.data);
                        } else {
                            this.data.editing = false;
                            this.data.edited = null;
                            this.data.errorMsg = null;
                            this.data.errors = null;
                            generalCrudActions.load();
                        }
                    }
              }.bind(this));
            
            
            this.trigger(this.data);
        },
        
        onDelete: function(data) {
           
            request('DELETE', endpoint + '/' + data.id)
               .set('Accept', 'application/json')
              .set('x-access-token', loggedUserStore.getData().token)
              .end(function(err, res){
                    if (err) {
                        this.data.errorMsg = res.body.message;
                        this.trigger(this.data);
                    } else {
                        if (res.body.message != null) {
                            this.data.errorMsg = res.body.message;
                            this.data.errors = res.body.errors;
                            this.trigger(this.data);
                        } else {
                            this.data.editing = false;
                            this.data.edited = null;
                            this.data.errorMsg = null;
                            this.data.errors = null;
                            generalCrudActions.load();
                        }
                    }
              }.bind(this));
            
            
            this.trigger(this.data);
        }
        
    });
    
    return {store: generalCrudStore, actions: generalCrudActions };
}
 

module.exports = { createStore: createStore };
