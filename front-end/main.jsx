import React from 'react';
import Header from './header';
import {default as Router, Route, RouteHandler, DefaultRoute} from 'react-router';
import Index from './index';
import About from './about';
import Statistics from './statistics';
import Map from './map';
 
class Main extends React.Component {
  render() {
    return (<div>
                <Header />
                <main className="main">
                    <RouteHandler />
                </main>
            </div>);
  }
}

// declare our routes and their hierarchy
var routes = (
  <Route handler={Main}>
    <DefaultRoute handler={Index}/>
    <Route handler={About} name="sobre" />
     <Route handler={Statistics} name="estatisticas" />
     <Route handler={Map} name="material/:id" />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
 
export default Main;