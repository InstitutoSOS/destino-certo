import React from 'react';


import { default as LoggedUserStore }from './stores/loggedUserStore'
import { default as LoggedUserActions }from './actions/loggedUserActions'
import { default as generalUiActions} from './actions/generalUiActions'
import { default as Router, Route, RouteHandler, DefaultRoute, Navigation, State, Link} from 'react-router';


class Dashboard extends React.Component {
  render() {
    generalUiActions.changeTitle('Dashboard');
    return  <div className="container">
                <div className="mainMenu">
                    <ul>
                        <li><Link to="/internal/dashboard/users">Usuários</Link></li>
                        <li><Link to="/internal/dashboard/pessoaJuridica">Pessoa Jurídica</Link></li>
                        <li><Link to="/internal/dashboard/tipoMaterial">Tipo de Material</Link></li>
                        <li><Link to="/internal/dashboard/material">Material</Link></li> 
                    </ul>
                </div>
                <div className="principal">
                    <RouteHandler />
                </div>
            </div>;
  }
  
  
}
 
export default Dashboard;