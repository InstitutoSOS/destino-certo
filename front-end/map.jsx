import React from 'react';
 
import materials from './model/materials' 
import request from 'superagent';
const API_ENDPOINT = 'http://destinocerto.sebastianhaeni.ch/api/material/';

import { GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {default as generalUiActions} from './actions/generalUiActions'
    


var materialsId = {"plastico":1,"vidro":2,"aluminio":3,"tetrapack":4,"papel":5,"outros":6};

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {material: props.params.id, updating: true, results: {}};
        this.buscarDados = this.buscarDados.bind(this);
        this.mouseOverMarker.bind(this);
        this.mouseOutMarker.bind(this);
        this.clickMarker.bind(this);
        this.buscarDados(this.state.material);
      }
      
    buscarDados(material) {
        var url  = API_ENDPOINT + materialsId[material]
        request
          .get('https://jsonp.afeld.me/?url=' + url)
          //.set('Accept', 'application/json')
          .end(function(err, res){
                this.setState({updating: false, results: JSON.parse(res.text)})
          }.bind(this));
    }
      
      
  componentWillReceiveProps(nextProps) {
    this.setState({material: nextProps.params.id, updating: true, results: {}});
    this.buscarDados( nextProps.params.id);
    
  }
  
  mouseOverMarker(index, event) {
    this.state.results.sites[index].icon='http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    this.setState({updating: false});
  }
  
  mouseOutMarker(index, event) {
    this.state.results.sites[index].icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    this.setState({updating: false});
  }
  
  clickMarker(index, event) {
    for (var i = 0; i < this.state.results.sites.length; i++) {
        this.state.results.sites[i].selected = false;
    }
    this.state.results.sites[index].selected=true;
    this.setState({updating: false});
  }

  render() {
    var array = [];
    for (var i = 0; i < materials.length; i++) {
        var clazz = '';
        if (this.state.material == materials[i].id) {
            clazz='active';
        }
        array.push(<a className={clazz} href={"#/material/" + materials[i].id} key={materials[i].id}>{materials[i].name}</a>);
    }
    var contents = '';
    if (this.state.updating) {
        contents =  <div className="container text-center"><img src="assets/images/load.gif" /></div>
    } else {
       var coops = null;
       var markers = []
       if (this.state.results.sites.length ==0) {
           coops = <small>Nenhuma cooperativa foi encontrada. :(</small>
       } else {
            coops = [];
            for (var i = 0; i < this.state.results.sites.length; i++) {
                var coop = this.state.results.sites[i];
                if (coop.icon == null) {
                    coop.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                }
                var coopClass = '';
                if (coop.selected) {
                    coopClass = 'active';
                    var content  = '<strong style="font-size: 16px">' + coop.currentLocation.site.name + '</strong>';
                    content += "<br>" + coop.currentLocation.site.address; 
                    
                    markers.push(<InfoWindow key='info'
                                    position={{lat: parseFloat(coop.currentLocation.site.lat) + 0.0155, lng: parseFloat(coop.currentLocation.site.lng)}} 
                                    content={content} 
                                    
                                 />)
                }
                coops.push(<li key={coop.id} className={coopClass} >
                                 <strong>{coop.currentLocation.site.name}</strong>
                                 <address>{coop.currentLocation.site.address}</address>
                                 <small className="weight-field">Disponível: {coop.weight.replace(/[.][0-9]+/g, '')} kg</small>
                            </li>);
                markers.push(<Marker 
                                position={{lat: parseFloat(coop.currentLocation.site.lat), lng: parseFloat(coop.currentLocation.site.lng)}} 
                                defaultAnimation={2} 
                                key={coop.id} 
                                icon={coop.icon} 
                                onMouseover={this.mouseOverMarker.bind(this,i)} 
                                onMouseout={this.mouseOutMarker.bind(this,i)} 
                                onClick={this.clickMarker.bind(this,i)} 
                             />);
           }
           //console.log(markers);
       }
       var mapOptions = {
        panControl: false,
        zoomControl: true,
        scaleControl: false
      }
    
       contents =<div> 
                    <div className="results clear">
                      <div className="container">
                        <span className="results-total">{this.state.results.name} - <span data-total-results="">{this.state.results.sites.length}</span> resultados</span>
                      </div>
                    </div>
                    <div className="map-content">
                      <div className="container">
                        <div className="cooperatives-list">
                          <strong className="title">Cooperativas</strong>
                          <ul data-cooperatives-target="">{coops}</ul>
                        </div>
                        <div className="map">
                            <strong className="map-target title">Mapa</strong>
                            <GoogleMap 
                                defaultZoom={11}
                                defaultCenter={{lat: -23.550228111445016, lng: -46.63098330873412}} 
                                defaultOptions={mapOptions}
                                containerProps= {{className: "gmap" }}>
                                {markers}
                            </GoogleMap>
                        </div>
                      </div>
                    </div>
                </div>
    }
    return  <div>
                <div className="material-list">
                  <div className="container">
                    {array}
                  </div>
                </div>
                {contents}
            </div>;
  }
}
 
export default Map;