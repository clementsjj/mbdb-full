import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Maps from './components/Map/Map.stable/Maps';
import MyMapComponent from './components/Map/rgm/MyMapComponent';
import apikey from './utils/apikey';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar style={{ marginBottom: 0 }} />
        <MyMapComponent
          isMarkerShown
          googleMapURLToo="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `95vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
