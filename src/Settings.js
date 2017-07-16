import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import * as firebase from 'firebase';

class Settings extends Component {
  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut().catch(function(error) {
      alert(error.code);
      console.log(error.code);
      console.log(error.message);
    });
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

export default Settings;
