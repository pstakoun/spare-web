import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import * as firebase from 'firebase';

class Profile extends Component {
  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    return (
      <Form onSubmit={this.handleLogout}>
        <FormGroup>
          <Button type="submit">
            Log Out
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default Profile;
