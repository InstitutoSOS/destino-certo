import React from 'react';
 
class About extends React.Component {
  render() {
    return  <div>
                <div className="content">
                  <div className="container">
                    <span>Ajudar as pessoas faz bem!</span>
                  </div>
                </div>

                <div className="about-us">
                  <div className="container">
                    <h3>Sobre nós</h3>
                    <p>
                       Somos uma instituição sem fins lucrativos qualificada como OSCIP que tem como objetivo aplicar e difundir integralmente os conceitos de sustentabilidade.<br/> <br/>
                       Nossa missão é vencer o grande desafio de trazer para a prática os tão falados conceitos de sustentabilidade, auxiliando nossos clientes e parceiros a maximizar o resultado de seus investimentos sociais em consonância com o cumprimento das legislações vigentes para informar e promover uma mudança profunda nos hábitos das pessoas impactadas direta e indiretamente por nossos projetos.
                    </p>
                  </div>
                </div>

                <div className="cooperatives">
                  <div className="container">
                    <h3>O que fazemos</h3>
                    <p>
                    Difundimos e aplicamos integralmente os conceitos de sustentabilidade por meio da organização de sistemas para uma sociedade mais justa, com melhor distribuição de recursos e mais correta do ponto de vista ambiental.<br/><br/> 
                      Nosso principal (mas não único) foco é o desenvolvimento de projetos para gestão sustentável de resíduos, objetivando transformar o que antes era problema em solução para gerar inclusão, renda distribuída e benefícios ao Meio Ambiente pela reinserção de materiais na cadeia produtiva. 
                    </p>
                  </div>
                </div>

                <div className="footer">
                  <div className="container">
                    2015 DestinoCerto. Criado com muito <strong>❤</strong> no WorldSkills Digital Challenge 2015.
                  </div>
                </div>
            </div>;
  }
}
 
export default About;