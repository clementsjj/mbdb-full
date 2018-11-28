import React, { Component } from 'react';
import {
  Menu,
  Button,
  Modal,
  Header,
  Icon,
  Container
} from 'semantic-ui-react';
import FormContainer from './FormContainer';
import '../../App.css';

export default class Navbar extends Component {
  state = {};
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu
        className={'nav'}
        inverted
        style={{
          padding: '.25vh',
          marginBottom: 0,
          height: '5vh'
        }}
      >
        <Menu.Item header style={{ color: 'green' }}>
          <Header as="h1" style={{ color: 'green' }}>
            MBDB
          </Header>
        </Menu.Item>
        <Modal
          trigger={
            <Button basic color="green" style={{ marginLeft: '5%' }}>
              Add Bathroom
            </Button>
          }
          basic
          centered
          closeIcon
          size="large"
        >
          <Header icon="chess rock" content="Enter Bathroom Information" />
          <Modal.Content>
            <FormContainer />
          </Modal.Content>
          <Modal.Actions />
        </Modal>
      </Menu>
    );
  }
}
