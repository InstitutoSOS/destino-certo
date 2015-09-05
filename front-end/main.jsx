import React from 'react';
import Header from './header';
import {default as Router, Route, RouteHandler, DefaultRoute, NotFoundRoute} from 'react-router';
import Index from './index';
import About from './about';
import Statistics from './statistics';
import Map from './map';
import Login from './login'
import Internal from './internal'
import Dashboard from './dashboard'
import {default as generalUiActions} from './actions/generalUiActions'
import {default as generalUiStore} from './stores/generalUiStore'


import {default as userStore} from './stores/userStore'
import {default as pessoaJuridicaStore } from './stores/pessoaJuridicaStore'
import {default as tipoMaterialStore } from './stores/tipoMaterialStore'
import {default as materialStore} from './stores/materialStore'

import {default as generalCrud} from './generalCrud/generalCrud'
import {default as BooleanRenderer} from './generalCrud/renderer/booleanRenderer'
import {default as PasswordEditor} from './generalCrud/editor/passwordEditor'
import {default as BooleanEditor} from './generalCrud/editor/booleanEditor'
import {default as SelectEditor} from './generalCrud/editor/selectEditor'



 
class Main extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = generalUiStore.getData();
  }

  render() {
    return (<div>
                <Header />
                <div className="content">
                    <div className="container">{this.state.title}</div>
                </div>
                <main className="main">
                    <RouteHandler />
                </main>
            </div>);
  }
  
    onTitleChange(data) {
        this.setState(data);
    }

    componentDidMount() {
        this.unsubscribe = generalUiStore.listen(this.onTitleChange.bind(this));
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }
}

var wrapComponent = function(Component, props) {
  return React.createClass({
    render: function() {
      return React.createElement(Component, props);
    }
  });
};

//var userCrud = <generalCrud store={userStore} />

// declare our routes and their hierarchy
var routes = (
  <Route handler={Main}>
    <DefaultRoute handler={Index}/>
    <Route handler={About} name="sobre" />
     <Route handler={Statistics} name="estatisticas" />
     <Route handler={Map} name="material/:id" />
     <Route handler={Internal} name="internal">
        <DefaultRoute handler={Login}  />
        <Route handler={Dashboard} name="dashboard">
            <Route name="users" handler={wrapComponent(generalCrud, {
                store: userStore.store, actions: userStore.actions,
                    columns: [
                        {field:"id", name:"ID"}, 
                        {field:"email", name:"E-mail"}, 
                        {field:"name", name:"Nome"}, 
                        {field:"admin", name:"Administrador", renderer: BooleanRenderer}
                    ],
                    editColumns: [
                        {field:"email", name:"E-mail"}, 
                        {field:"name", name:"Nome"}, 
                        {field:"admin", name:"Administrador", editor: BooleanEditor},
                        {field:"password", name:"Senha (Deixe em branco para não alterar)", editor: PasswordEditor},
                        {field:"pessoaJuridicaId", name:"Pessoa Jurídica", editor: SelectEditor, editorParams: {
                            store:pessoaJuridicaStore.store, 
                            actions: pessoaJuridicaStore.actions, 
                            transformation: function(data) {
                                    return {value:data.id, name:data.name};
                                }
                            }
                        }
                    ]
                })} />
            <Route name="pessoaJuridica" handler={wrapComponent(generalCrud, {
                store: pessoaJuridicaStore.store, actions: pessoaJuridicaStore.actions,
                    columns: [
                        {field:"id", name:"ID"}, 
                        {field:"name", name:"Nome"}, 
                        {field:"tipo", name:"Tipo"}
                    ],
                    editColumns: [
                        {field:"name", name:"Nome"}, 
                        {field:"cnpj", name:"CNPJ"},
                        {field:"tipo", name:"Tipo", editor: SelectEditor, editorParams: {options:['Cooperativa', 'Reciclador', 'Gerador']}}
                    ]
                })} />
            <Route name="tipoMaterial" handler={wrapComponent(generalCrud, {
                store: tipoMaterialStore.store, actions: tipoMaterialStore.actions,
                    columns: [
                        {field:"id", name:"ID"}, 
                        {field:"name", name:"Nome"}, 
                        {field:"simpleName", name:"Nome Simples"}
                    ],
                    editColumns: [
                        {field:"name", name:"Nome"}, 
                        {field:"simpleName", name:"Nome Simples"}
                    ]
                })} />
            <Route name="material" handler={wrapComponent(generalCrud, {
                store: materialStore.store, actions: materialStore.actions,
                    columns: [
                        {field:"id", name:"ID"}, 
                        {field:"name", name:"Nome"}
                    ],
                    editColumns: [
                        {field:"name", name:"Nome"}, 
                        {field:"tipoMaterialId", name:"Tipo de Material", editor: SelectEditor, editorParams: {
                            store: tipoMaterialStore.store, 
                            actions: tipoMaterialStore.actions, 
                            transformation: function(data) {
                                    return {value:data.id, name:data.name};
                                }
                            }
                        }
                    ]
                })} />
                
        </Route>
     </Route>
     <NotFoundRoute handler={Index} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
 
export default Main;