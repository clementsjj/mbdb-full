import React, { Component } from 'react';
import { Button, Header, Icon, Container, Grid, Menu } from 'semantic-ui-react';
import axios from 'axios';
import Script from 'react-load-script';

const apikey = 'AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA';
let placesToMap = null;

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedPlace: {},
      newBathroom: {
        name: '',
        address: '',
        code: ''
      },
      placesResult: null,
      placeRequest: {
        query: '',
        fields: [
          'address_component',
          'adr_address',
          'formatted_address',
          'name',
          'type',
          'vicinity'
        ],
        locationBias: { radius: 1000, center: { lat: 40.7308, lng: -73.9973 } }
      },
      buttons: {
        checkAddressButton: false
      }
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCheckAddress = this.handleCheckAddress.bind(this);
    this.handlePlaceSearch = this.handlePlaceSearch.bind(this);
  }

  /* This life cycle hook gets executed when the component mounts */

  handleCheckAddress(e) {
    e.preventDefault();

    const address1 = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${
      this.state.newBathroom.address
    }&inputtype=textquery&fields=formatted_address,name&locationbias=circle:1000@${
      this.state.placeRequest.locationBias.center.lat
    },${this.state.placeRequest.locationBias.center.lng}&key=${apikey}`;

    const address2 = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${
      this.state.newBathroom.address
    }&key=AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA`;

    const address3 = `https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=${apikey}`;

    console.log(this.state);
    axios
      .get(address1, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      .then(place => {
        this.setState({ receivedPlace: place });
        console.log(place);
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleAutocompleteSearch(e) {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3000/bathrooms/placesautocomplete?query=whole%20foods%20new%20york`
      )
      .then(place => {
        console.log('Place = ', place);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }

  handlePlaceSearch(e) {
    e.preventDefault();
    this.setState({ placesResult: {} });
    console.log(
      'Handle Place Search... with query of: ',
      this.state.newBathroom.address
    );
    let query = this.state.newBathroom.address;
    axios
      .get(
        `http://localhost:3000/bathrooms/placesearch?query=whole%20foods%20manhattan`
      )
      .then(place => {
        console.log('Place = ', place.data);
        let locationArray = place.data.slice(0, 5).map(item => {
          return JSON.stringify(item);
        });
        console.log('locationArray staged to push to state = ', locationArray);
        placesToMap = locationArray;
        this.setState({ placesResult: placesToMap });
        console.log('placesToMap = ', placesToMap);
        console.log('placesResult state changed to: ', this.state.placesResult);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newBathroom: {
        name: '',
        address: '',
        code: ''
      }
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newBathroom: {
          ...prevState.newBathroom,
          [name]: value
        }
      }),
      () =>
        console.log(
          'newBathroom Value (from FormContainer): ',
          this.state.newBathroom
        )
    );
  }
  handleScriptLoad() {
    // console.log('Script Loaded');
    // var input = document.getElementById('autocomplete');
    // this.autocomplete = new google.maps.places.Autocomplete(input);
    // this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }
  handlePlaceSelect() {
    // // Extract City From Address Object
    // let addressObject = this.autocomplete.getPlace();
    // let address = addressObject.address_components;
    // // Check if address is valid
    // if (address) {
    //   // Set State
    //   this.setState({
    //     city: address[0].long_name,
    //     query: addressObject.formatted_address
    //   });
    // }
  }

  handleAddressSelect(e) {
    console.log('Selected Address = ', e.target);
    let newAddressObject = e.target.value;
    console.log('Parsed Object = ', JSON.parse(newAddressObject));
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <Grid stackable padded={false}>
          <Grid.Row centered columns={2} verticalAlign="middle">
            <Grid.Column>
              <form className="container" onSubmit={this.handleFormSubmit}>
                <Container style={{ border: '2px solid deeppink' }}>
                  <input
                    id="autocomplete"
                    placeholder="Try Autocomplete"
                    name="address"
                    style={{ margin: 5 }}
                    value={this.state.newBathroom.address}
                    onChange={this.handleInput}
                  />
                  <Button
                    size="tiny"
                    basic
                    color="blue"
                    style={{ marginTop: 5 }}
                    disabled={this.state.newBathroom.address ? false : false}
                    onClick={this.handleAutocompleteSearch}
                  >
                    Autocomplete Search
                  </Button>
                </Container>
                <br />
                <Container style={{ border: '2px solid green' }}>
                  <input
                    placeholder="Bathroom Address"
                    name="address"
                    style={{ margin: 5 }}
                    value={this.state.newBathroom.address}
                    onChange={this.handleInput}
                  />
                  <Button
                    size="tiny"
                    basic
                    color="blue"
                    style={{ marginTop: 5 }}
                    disabled={this.state.newBathroom.address ? true : true}
                    onClick={this.handleCheckAddress}
                  >
                    Check Address
                  </Button>
                  <Button
                    size="tiny"
                    basic
                    color="blue"
                    style={{ marginTop: 5 }}
                    disabled={this.state.newBathroom.address ? false : false}
                    onClick={this.handlePlaceSearch}
                  >
                    Handle Place Search
                  </Button>
                  <p
                    style={
                      this.state.newBathroom.address
                        ? { display: 'none' }
                        : { display: 'block' }
                    }
                  />

                  {/* {placesToMap == null
                    ? ''
                    : placesToMap.map(item => {
                        let objItem = JSON.parse(item);
                        return (
                          <p>
                            <span>{objItem.name}</span>&nbsp;-&nbsp;
                            <span>
                              {objItem.formatted_address}
                              <br /> Lat: {objItem.geometry.location.lat} , Lng:{' '}
                              {objItem.geometry.location.lng}
                            </span>
                          </p>
                        );
                      })} */}

                  {placesToMap == null ? (
                    ''
                  ) : (
                    <Menu vertical inverted>
                      {placesToMap.map((item, i) => {
                        let objItem = JSON.parse(item);
                        return (
                          <div>
                            <Menu.Item
                              as="button"
                              name={item}
                              value={item}
                              onClick={this.handleAddressSelect}
                              key={i}
                            >
                              <Header as="h4" style={{ color: 'white' }}>
                                {objItem.name}
                              </Header>
                              {objItem.formatted_address}
                            </Menu.Item>
                          </div>
                        );
                      })}
                    </Menu>
                  )}
                </Container>

                <br />
                <Container
                  style={{ border: '2px solid green', display: 'none' }}
                >
                  <Container>
                    <input
                      placeholder="Name"
                      style={{ margin: 5 }}
                      name="name"
                      value={this.state.newBathroom.name}
                      onChange={this.handleInput}
                    />
                    <p>What shall we name this bathroom?</p>
                  </Container>

                  <br />
                  <Container>
                    <input
                      placeholder="Bathroom Code"
                      name="code"
                      style={{ margin: 5 }}
                      value={this.state.newBathroom.code}
                      onChange={this.handleInput}
                    />
                    <p>What is the bathroom code/pin?</p>
                  </Container>
                  <br />
                  <Button
                    color="green"
                    inverted
                    disabled={
                      this.state.newBathroom.name ||
                      this.state.newBathroom.address ||
                      this.state.newBathroom.code
                        ? false
                        : true
                    }
                  >
                    <Icon name="checkmark" />
                    Submit
                  </Button>
                  <Button
                    color="red"
                    inverted
                    onClick={this.handleClearForm}
                    disabled={
                      this.state.newBathroom.name ||
                      this.state.newBathroom.address ||
                      this.state.newBathroom.code
                        ? false
                        : true
                    }
                  >
                    Clear Form
                  </Button>
                </Container>
              </form>
            </Grid.Column>
            <Grid.Column>
              <Container>
                <p>Something</p>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default FormContainer;

// Helpful with Forms:
//https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
/*

        {/* <Script
          //   url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA&libraries=places"
          onLoad={this.handleScriptLoad}
        /> 
         <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA&libraries=places"></script> 

        */

/*


https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA


*/
