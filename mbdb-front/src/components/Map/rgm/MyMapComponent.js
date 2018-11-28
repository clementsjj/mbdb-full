import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import { Modal } from 'semantic-ui-react';
import { bluewc16, bluewc32, bluewc24 } from '../../../assets/icons';
import { getBathrooms } from './getBathrooms';

//let markers = [];

class MyMapComponent extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      bathrooms: null,
      isOpen: false,
      selectedMarker: null
    };

    //this.createMarkers = this.createMarkers.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleModalWindow = this.handleModalWindow.bind(this);
  }
  //   createMarkers() {
  //     markers = this.state.bathrooms.map((item, i) => {
  //       //let lat = item.lat;
  //       //let lng = item.lng;
  //       return <Marker key={i} position={{ lat: item.lat, lng: item.lng }} />;
  //     });
  //     //console.log(markers);
  //   }

  handleMarkerClick(index) {
    this.setState({ isOpen: true, selectedMarker: index });
  }
  handleCloseClick() {
    this.setState({ isOpen: false, selectedMarker: null });
  }
  handleModalWindow(index) {
    return (
      <Modal>
        <Modal.Content>Hello.</Modal.Content>
      </Modal>
    );
  }

  componentDidMount() {
    getBathrooms()
      .then(data => {
        this.setState({
          bathrooms: data.bathrooms.data.payload
        });
        //this.createMarkers(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const markersII = this.state.bathrooms || [];
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 40.7308, lng: -73.9973 }}
      >
        {/* {this.props.isMarkerShown && (
          <div>
            <Marker position={{ lat: 40.7308, lng: -73.9973 }} />
            <Marker position={{ lat: 40.7164903, lng: -73.9867718 }} />
            {markers}
          </div>
        )} */}

        {markersII.map((bathroom, i) => (
          <Marker
            position={{ lat: bathroom.lat, lng: bathroom.lng }}
            clickable={true}
            icon={bluewc32}
            key={i}
            onClick={() => {
              this.handleMarkerClick(i);
            }}
          >
            {this.state.selectedMarker == i && (
              <InfoWindow onCloseClick={this.handleCloseClick}>
                <div align="center">
                  <p style={{ margin: 0, padding: 0 }}>
                    <strong>{bathroom.name}</strong>
                  </p>
                  <p>
                    Code: <em>{bathroom.code}</em>
                  </p>
                  {bathroom.isPublic ? <p>Public</p> : <p>Private</p>}

                  <Modal
                    trigger={
                      <p style={{ color: 'blue' }}>
                        <em>Click for Address</em>
                      </p>
                    }
                    size="mini"
                    closeIcon
                    centered
                  >
                    <Modal.Content>{bathroom.address}</Modal.Content>
                  </Modal>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    );
  }
}
export default withScriptjs(withGoogleMap(MyMapComponent));
