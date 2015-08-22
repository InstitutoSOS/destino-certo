import React from 'react';
 
class Header extends React.Component {
  render() {
    return <header>
              <div className="container">
                <div className="logo">
                  <figure>
                    <a href="/">
                      <img src="assets/images/destinocerto-logo.png" alt="Logo do DestinoCerto" title="Destino Certo" />
                    </a>
                  </figure>
                </div>

                <div className="menu">
                  <ul>
                    <li><a href="#/sobre">Sobre</a></li>
                    <li><a href="#/estatisticas">Estatísticas</a></li>
                  </ul>
                </div>
              </div>
            </header>;
  }
}
 
export default Header;