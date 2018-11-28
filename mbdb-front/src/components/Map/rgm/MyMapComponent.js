import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

import { getBathrooms } from './getBathrooms';

let markers;

class MyMapComponent extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      bathrooms: null
    };

    this.createMarkers = this.createMarkers.bind(this);
  }
  createMarkers() {
    markers = this.state.bathrooms.map((item, i) => {
      let lat = item.lat;
      let lng = item.lng;
      return <Marker key={i} position={{ lat: lat, lng: lng }} />;
    });
    console.log(markers);
  }

  componentDidMount() {
    getBathrooms()
      .then(data => {
        this.setState({
          bathrooms: data.bathrooms.data.payload
        });
        this.createMarkers(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 40.7308, lng: -73.9973 }}
      >
        {this.props.isMarkerShown && (
          <div>
            <Marker position={{ lat: 40.7308, lng: -73.9973 }} />
            <Marker position={{ lat: 40.7164903, lng: -73.9867718 }} />
            {markers}
          </div>
        )}
      </GoogleMap>
    );
  }
}
export default withScriptjs(withGoogleMap(MyMapComponent));
