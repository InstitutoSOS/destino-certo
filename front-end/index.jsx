// index.jsx
import React from 'react';

import Materials from './materials'
import {default as generalUiActions} from './actions/generalUiActions'

class Index extends React.Component {
  render() {
    generalUiActions.changeTitle('Encontre cooperativas e faça bons negócios!')
    return (<div>
                <div className="container">
                  <div className="search">
                    <Materials />
                  </div>
                </div>

                <div className="about-us">
                  <div className="container">
                    <h3>Como Funciona</h3>
                    <p>
                       DestinoCerto é um sistema onde recicladoras podem achar cooperativas de reciclagem que tem material disponível para coleta.<br /> <br />
                       Nossa missão é vencer o grande desafio de trazer para a prática os tão falados conceitos de sustentabilidade, auxiliando nossos clientes e parceiros a maximizar o resultado de seus investimentos sociais em consonância com o cumprimento das legislações vigentes para informar e promover uma mudança profunda nos hábitos das pessoas impactadas direta e indiretamente por nossos projetos.
                    </p>
                  </div>
                </div>


                <div className="footer">
                  <div className="container">
                    2015 DestinoCerto. Criado com muito <strong>❤</strong> no WorldSkills Digital Challenge 2015.
                  </div>
                </div>
           </div>)
  }
}
 
export default Index;



