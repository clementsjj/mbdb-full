//Reusable Component imported using lazy loading
//Recieves an id, options, onMapLoad props

import React, { Component } from 'react';
import { render } from 'react-dom';
import InfoWindow from './InfoWindow';

export default class AdvancedMap extends Component {
  state = {
    currentLocation: { lat: '50.0000', lng: '-80.0000' },
    theMap: null
  };

  onScriptLoad() {
    console.log('*FIRE* onScriptLoad()');

    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    );
    this.props.onMapLoad(map);
    this.setState({ theMap: map });
    this.getYou();
  }

  createInfoWindow(e, map, message) {
    const infoWindow = new window.google.maps.InfoWindow({
      content: `<div id="infoWindow" />`,
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    });
    infoWindow.addListener('domready', e => {
      render(
        <InfoWindow message={message} />,
        document.getElementById('infoWindow')
      );
    });
    infoWindow.open(map);
  }

  getYou() {
    console.log(this.props.id);
    console.log('*FIRE* getYou()');
    var promise = new Promise((resolve, reject) => {
      const geolocator = navigator.geolocation;

      if (!geolocator) {
        reject(new Error('Not Supported'));
      }

      geolocator.getCurrentPosition(position => {
        resolve(position.coords);
      });
    });
    promise.then(coords => {
      this.setState({
        currentLocation: {
          lat: coords.latitude,
          lng: coords.longitude
        }
      });
      console.log('New State: ', this.state.currentLocation);

      var marker = new window.google.maps.Marker({
        position: {
          lat: this.state.currentLocation.lat,
          lng: this.state.currentLocation.lng
        },
        map: this.state.theMap,
        title: 'You!'
      });

      marker.addListener('click', e => {
        this.createInfoWindow(e, this.state.theMap, 'This is You!!');
      });
    });
  }

  componentDidMount() {
    console.log('*FIRE* componentDidMount()');
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAYzDOXRGzFOOl8e1mCMGBxu6pl_tiruCc`;

      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);

      //Cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  render() {
    return (
      <div
        style={{ width: '100vw', height: '95vh', marginTop: '0px' }}
        id={this.props.id}
      />
    );
  }
}
