import React, { Component } from 'react';
import {
  Button,
  Header,
  Icon,
  Container,
  Grid,
  Menu,
  Divider
} from 'semantic-ui-react';
import axios from 'axios';

const apikey = 'AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA';
let placesToMap = null;

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      receivedPlace: {},
      newBathroom: {
        name: '',
        address: '',
        location: { lat: '', lng: '' },
        code: '',
        isPublic: ''
      },
      placesResult: null,
      activeItem: 6,
      selectedAddress: null,
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
      status: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePlaceSearch = this.handlePlaceSearch.bind(this);
    this.handleAddressSelect = this.handleAddressSelect.bind(this);
    //this.SelectedLocation = this.SelectedLocation.bind(this);
  }

  /* This life cycle hook gets executed when the component mounts */

  handlePlaceSearch(e) {
    e.preventDefault();
    this.setState({ placesResult: {} });
    let query = this.state.newBathroom.address;
    console.log(`Handle Place Search... with query of: ${query}`);
    axios
      .get(`http://localhost:3000/bathrooms/placesearch?query=${query}`)
      .then(place => {
        console.log('Place = ', place.data);
        let locationArray = place.data.slice(0, 5).map(item => {
          return JSON.stringify(item);
        });
        //console.log('locationArray staged to push to state = ', locationArray);
        placesToMap = locationArray;
        this.setState({ placesResult: placesToMap });
        //console.log('placesToMap = ', placesToMap);
        //console.log('placesResult state changed to: ', this.state.placesResult);
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
      },
      selectedAddress: null
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let address = `http://localhost:3000/bathrooms/addbathroom`;
    let bathroomToAdd = this.state.newBathroom;

    axios
      .post(address, bathroomToAdd)
      .then(res => {
        this.setState({
          status: 'Success!',
          selectedAddress: null,
          placesResult: null
        });

        console.log('Success!!!!');
        setTimeout(() => {
          console.log('After Submitted State: ', this.state);
        }, 50);
      })
      .catch(err => console.log(err));
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

  //   handleNameINput = e => {
  //     console.log('---');
  //     console.log(e);
  //   };

  handleAddressSelect(e, { name, value }) {
    this.setState({ activeItem: name });
    // console.log('Name ', name);
    // console.log('Name ', value);
    // console.log('activeItem: ', this.state.activeItem);
    //console.log('Selected Address = ', e.target);

    let parsedJSON = JSON.parse(value);
    let newObject = {
      test: parsedJSON
    };
    let placeID = newObject.test.place_id;
    let lat = newObject.test.geometry.location.lat;
    let lng = newObject.test.geometry.location.lng;
    let locationObject = { lat: lat, lng: lng };
    console.log('Lat: ', lat, 'Lng: ', lng, 'Location: ', locationObject);

    //console.log('newAddressObject (parsed) = ', newAddressObject);
    // console.log('formatted_address = ', newAddressObject.formatted_address);
    //console.log('geometry = ', newAddressObject);
    //console.log(JSON.stringify(newAddressObject));
    //console.log('geometry.location = ', newAddressObject.geomerty.location);

    this.setState({
      selectedAddress: JSON.parse(value),
      newBathroom: {
        address: newObject.test.formatted_address,
        location: locationObject,
        place_id: placeID
      }
      //newBathroom: { location: { lat: lat, lng: lng } }
    });
    setTimeout(() => {
      console.log('Current selected address: ', this.state.selectedAddress);
    }, 50);
  }
  componentDidMount() {
    console.log('Component-Did-Mount State: ', this.state);
  }

  render() {
    return (
      <div>
        <Grid stackable padded={false}>
          <Grid.Row centered columns={2} verticalAlign="middle">
            <Grid.Column>
              <form className="container" onSubmit={this.handleFormSubmit}>
                <Container
                // style={{ border: '2px solid green' }}
                >
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
                    style={{ marginTop: 5, marginBottom: 5 }}
                    disabled={this.state.newBathroom.address ? false : false}
                    onClick={this.handlePlaceSearch}
                  >
                    Search for Place
                  </Button>
                  <p
                    style={
                      this.state.newBathroom.address
                        ? { display: 'none' }
                        : { display: 'block' }
                    }
                  />

                  {placesToMap == null ? (
                    ''
                  ) : (
                    <Menu vertical inverted>
                      {placesToMap.map((item, i) => {
                        let objItem = JSON.parse(item);
                        let stringI = i + '';
                        return (
                          <div key={stringI}>
                            <Menu.Item
                              name={stringI}
                              active={this.state.activeItem === stringI}
                              value={item}
                              onClick={this.handleAddressSelect}
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
              </form>
            </Grid.Column>
            {this.state.selectedAddress !== null && (
              <Grid.Column>
                <Container
                // style={{ border: '2px solid green' }}
                >
                  <FinalFormInput data={this.state} />
                  {/* <NameInput submit={this.handleNameINput} /> */}
                  <Container>
                    <input
                      placeholder="Name"
                      style={{ margin: 5 }}
                      name="name"
                      value={this.state.newBathroom.name}
                      onChange={this.handleInput.bind(this)}
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
                  <Container>
                    <input
                      name="isPublic"
                      type="radio"
                      value="true"
                      onChange={this.handleInput}
                    />{' '}
                    Public &nbsp;&nbsp;
                    <input
                      name="isPublic"
                      type="radio"
                      value="false"
                      checked
                      onChange={this.handleInput}
                    />{' '}
                    Private
                  </Container>
                  <br />
                  <Container>
                    Quality:{'  '}
                    <input
                      name="quaity"
                      type="radio"
                      value="1"
                      onChange={this.handleInput}
                    />{' '}
                    1{'  '}&nbsp;
                    <input
                      name="quaity"
                      type="radio"
                      value="2"
                      onChange={this.handleInput}
                    />{' '}
                    2{'  '}&nbsp;
                    <input
                      name="quaity"
                      type="radio"
                      value="3"
                      checked
                      onChange={this.handleInput}
                    />{' '}
                    3{'  '}&nbsp;
                    <input
                      name="quaity"
                      type="radio"
                      value="4"
                      onChange={this.handleInput}
                    />{' '}
                    4{'  '}&nbsp;
                    <input
                      name="quaity"
                      type="radio"
                      value="5"
                      onChange={this.handleInput}
                    />{' '}
                    5{'  '}
                  </Container>
                  <br />
                  <Button
                    color="green"
                    inverted
                    onClick={this.handleFormSubmit}
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
                  {'     '}
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
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function FinalFormInput(props) {
  return (
    <Container>
      <h4>Selected Location:</h4>
      <p>{props.data.selectedAddress.name}</p>
      <p>
        {props.data.selectedAddress.geometry.location.lat} |{' '}
        {props.data.selectedAddress.geometry.location.lng}
      </p>
      <Divider />
    </Container>
  );
}

// function NameInput(props) {
//   console.log('NameInputProps: ', props);
//   return (
//     <Container>
//       <Divider />
//       <input
//         placeholder="Name"
//         style={{ margin: 5 }}
//         name="name"
//         //value={this.state.newBathroom.name}
//         onChange={this.handleInput.bind(this)}
//       />
//       <p>What shall we name this bathroom?</p>
//       <Divider />
//     </Container>
//   );
// }

// class NameInput extends Component {
//   state = {
//     inputName: ''
//   };

//   handleNameInputChange = e => {
//     this.setState({
//       inputName: e.target.value
//     });
//   };

//   render() {
//     return (
//       <Container>
//         <Divider />
//         <input
//           placeholder="Name"
//           style={{ margin: 5 }}
//           name="name"
//           value={this.state.inputName}
//           onChange={this.handleNameInputChange}
//         />
//         <p>What shall we name this bathroom?</p>
//         <Divider />
//       </Container>
//     );
//   }
// }

export default FormContainer;
