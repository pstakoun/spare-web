import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedOut: false };
  }

  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut();
    this.setState({ loggedOut: true });
  }

  render() {
    return (
      <Form onSubmit={this.handleLogout.bind(this)} className="logout">
        {this.state.loggedOut && <Redirect to='/' push />}
        <FormGroup>
          <Button type="submit">
            Log Out
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default Preferences;
