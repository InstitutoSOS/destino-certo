import React from 'react';


import { default as LoggedUserStore }from './stores/loggedUserStore'
import { default as LoggedUserActions }from './actions/loggedUserActions'
import {default as generalUiActions} from './actions/generalUiActions'
    


class Login extends React.Component {
  render() {
    generalUiActions.changeTitle('Digite seu e-mail e senha para entrar')
    return  <div >
                <div>
                    <div className="container">
                      <div className="search">
                        <fieldset>
                            <p>
                                <label>E-mail:</label>
                                <input type="text" ref="email" />
                            </p>
                            <p>
                                <label>Senha:</label>
                                <input type="password" ref="password" />
                            </p>
                            <p className="text-center">
                                <button onClick={this.doLogin.bind(this)}>Entrar</button>
                            </p>
                        </fieldset>
                      </div>
                    </div>
                </div>
            </div>;
  }
  
  doLogin() {
    var email =React.findDOMNode(this.refs.email);
    var password =React.findDOMNode(this.refs.password);
    
    console.log(email.value)
    LoggedUserActions.login({email: email.value, password:  password.value});
  }
}
 
export default Login;