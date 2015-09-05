import React from 'react';
import {default as Router, Route, RouteHandler, DefaultRoute, Navigation, State} from 'react-router';
import {default as loggedUserStore} from './stores/loggedUserStore'

class Internal extends React.Component {


    constructor(props, context) {
        super(props);
        this.state = loggedUserStore.getData();
    }

    render() {
        
        if (this.state.user && this.context.router.getCurrentPath() == '/internal') {
            this.context.router.transitionTo('/internal/dashboard');
        }
        if (!this.state.user && this.context.router.getCurrentPath() != '/internal') {
            this.context.router.transitionTo('/internal');
        }
        return (<div className="dashboard">
                    <RouteHandler />
                </div>);
    }

    onLoggedUserChange(data) {
        this.setState(data);
    }

    componentDidMount() {
        this.unsubscribe = loggedUserStore.listen(this.onLoggedUserChange.bind(this));
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }
  
}

Internal.contextTypes = { 
  router: React.PropTypes.func.isRequired
};

export default Internal;