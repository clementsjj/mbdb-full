import React, { Component } from 'react';
import {
  Button,
  Header,
  Icon,
  Container,
  Grid,
  Menu,
  Divider,
  Segment
} from 'semantic-ui-react';
import { guyOnToilet, stylizedFist } from '../../assets/images';
class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        {/* <Grid stackable padded={false}>
          <Grid.Row centered columns={1} verticalAlign="middle">
            <Grid.Column> */}
        <Container>
          <h2>
            <img src={guyOnToilet} style={{ width: '2rem' }} />
            &nbsp; What is MBDB?
          </h2>
          <p>
            Its an ever growing database of public and private restrooms in
            Manhattan.
          </p>
          <h2>
            <img src={guyOnToilet} style={{ width: '2rem' }} />
            &nbsp; Why tho?
          </h2>
          <p>
            Manhattan is an awesome and crazy place... it can also be very
            difficult to find a restroom.
          </p>
          <p>
            In times of great stress, you need to know what is available nearby,
            ASAP!
          </p>
          <p>
            This database attempts to catalog public and private bathrooms, and
            provide door codes when necessary so you don't need to ask or use
            your receipt.
          </p>
          <br />
          <br />
          <br />
          <h1>
            <img src={stylizedFist} style={{ width: '3rem' }} />
            &nbsp;&nbsp; Bathrooms Belong To The People!
          </h1>
          <Divider />
          <br />
          <br />

          <a href="http://clementsjj.github.io" target="_blank">
            Created by JJ.
          </a>
        </Container>
        {/* </Grid.Column>
          </Grid.Row>
        </Grid> */}
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

export default FormContainer;
