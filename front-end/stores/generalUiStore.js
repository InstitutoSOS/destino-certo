var Reflux = require('reflux');
var generalUiActions = require('../actions/generalUiActions');


var generalUiStore = Reflux.createStore({

    // Initial setup
    init: function() {
       this.listenTo(generalUiActions.changeTitle, this.onChangeTitle);
    },

    // Callback
    onChangeTitle: function(newTitle) {
        if (data.title != newTitle) {
            data.title = newTitle;
            this.trigger(data);
        }
    },
    
    getData: function() {
        return data;    
    }

});

var data = {
    title: null
}




 

module.exports = generalUiStore;
