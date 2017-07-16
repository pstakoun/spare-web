import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import * as firebase from 'firebase';

class Account extends Component {
  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <p>{this.props.user.email}</p>
        <Form onSubmit={this.handleLogout}>
          <FormGroup>
            <Button type="submit">
              Log Out
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Account;
