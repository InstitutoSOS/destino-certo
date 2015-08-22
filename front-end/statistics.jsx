import React from 'react';
 
import materials from './model/materials' 
import Highcharts from 'react-highcharts';


    var materialsData = {
      plastico  : [200, 221, 194, 201, 208, 199, 203, 240, 287, 301, 314],
      vidro     : [103, 110, 99, 121, 108, 113, 136, 190, 199, 230, 260],
      aluminio  : [75, 84, 90, 79, 81, 75, 80, 88, 94, 101, 121],
      tetrapack : [145, 155, 140, 151, 149, 152, 160, 165, 170, 177, 186],
      papel     : [231, 260, 240, 263, 259, 263, 255, 280, 288, 298, 306],
      outros    : [130, 154, 144, 151, 140, 146, 151, 170, 183, 192, 201]
    };

    var colors = {
      plastico  : 'rgba(149,206,255,1)',
      vidro     : 'rgba(92,92,97,1)',
      aluminio  : 'rgba(169,255,150,1)',
      tetrapack : 'rgba(255,188,117,1)',
      papel     : 'rgba(153,158,255,1)',
      outros    : 'rgba(255,117,153,1)',
    };

var initialConfig = {
          credits: {
            enabled: false
          },
          navigation: {
            buttonOptions: {
              enabled: false
            }
          },
          chart: {
            backgroundColor: '#F5F5F5',
          },
          title: {
              text: ''
          },
          yAxis: {
            labels: {
              format: '{value}kg'
            },
            title: {
              text: null
            }
          },
          xAxis: {
              categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          },
          labels: {
              items: [{
                  html: 'Total Reciclado',
                  style: {
                      left: '50px',
                      top: '18px',
                      color: 'black'
                  }
              }]
          },
          series: [{
              colorByPoint: true,
              type: 'column',
              name: 'Plastico',
              data: materialsData.plastico
          },
          {
              type: 'column',
              name: 'Vidro',
              data: materialsData.vidro
          },
          {
              type: 'column',
              name: 'Alumínio',
              data: materialsData.aluminio
          }, {
              type: 'column',
              name: 'Tetrapack',
              data: materialsData.tetrapack
          }, {
              type: 'column',
              name: 'Papel',
              data: materialsData.papel
          }, {
              type: 'column',
              name: 'Outros',
              data: materialsData.outros
          }, {
              type: 'pie',
              name: 'Total reciclado',
              data: [{
                  name: 'Plastico',
                  y: eval(materialsData.plastico.join('+')),
                  color: colors['plastico']
              }, {
                  name: 'Vidro',
                  y: eval(materialsData.vidro.join('+')),
                  color: colors['vidro']
              }, {
                  name: 'Aluminio',
                  y: eval(materialsData.aluminio.join('+')),
                  color: colors['aluminio']
              }, {
                  name: 'Tetrapack',
                  y: eval(materialsData.tetrapack.join('+')),
                  color: colors['tetrapack']
              }, {
                  name: 'Papel',
                  y: eval(materialsData.papel.join('+')),
                  color: colors['papel']
              }, {
                  name: 'Outros',
                  y: eval(materialsData.outros.join('+')),
                  color: colors['outros']
              }],
              center: [170, 12],
              size: 80,
              showInLegend: false,
              dataLabels: {
                  enabled: false
              }
          }]
      };

class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {material: 'integrado'};
        this.changed = this.changed.bind(this)
      }

    
    changed(e) {
        this.setState({material: e.target.value});
    }

  render() {
    var array = [];
    var config = initialConfig;
    for (var i = 0; i < materials.length; i++) {
        
        if (this.state.material == materials[i].id){
            config = this.getCurrentChart(this.state.material);
        }
        array.push(<option value={materials[i].id}  key={materials[i].id}>{materials[i].name}</option>);
    }
    
    return  <div>
                <div className="content">
                    <div className="container">
                        <span>Como podemos melhorar o processo de reciclagem!</span>
                    </div>
                </div>
                <br /><br />
                <div className="select">
                  <div className="container">
                    Filtrar por material:&nbsp;
                    <select onChange={this.changed} ref="select">
                        <option value='integrado'>Integrado</option>
                        {array}
                    </select>
                  </div>
                </div>
                <div className="container">
                    <Highcharts config={config} />
                </div>
            </div>;
  }
  
  getCurrentChart(current) {
    return {
          credits: {
            enabled: false
          },
          navigation: {
            buttonOptions: {
              enabled: false
            }
          },
          chart: {
            backgroundColor: '#F5F5F5',
          },
          title: {
              text: ''
          },
          yAxis: {
            labels: {
              format: '{value}kg'
            },
            title: {
              text: null
            }
          },
          xAxis: {
              categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          },
          series: [{
              type: 'column',
              name: capitalizeFirstLetter(current),
              data: materialsData[current],
              color: colors[current]
          }]
      }
  }
  
  
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
 

export default Statistics;