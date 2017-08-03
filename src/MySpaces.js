import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Button, Panel, Col } from 'react-bootstrap';
import './App.css';
import SpaceListing from './SpaceListing';

class MySpaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  spaces: null
    };
  }

  componentDidMount() {
    firebase.database().ref('spaces').orderByChild('user').equalTo(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      this.setState({ spaces: snapshot.val() });
    });
  }

  renderSpaces() {

    var arr = [];
    for (var key in this.state.spaces) {
      arr.push(
        <Panel className="listingPanel">
          <SpaceListing space={this.state.spaces[key]} />
          <Col xs={12} md={2}>
            <Button bsStyle="info">Manage Booking</Button>
            <Link to='/spaces/edit' onClick={() => this.props.editSpace(this.state.spaces[key])} className="btn btn-default">Edit Info</Link>
          </Col>
        </Panel>
      );
    }
    return arr;
  }

  render() {
    return (
        <div style={{ paddingTop: `50px` }}>
            <h4>My Listings</h4>
            {this.renderSpaces()}
            <Link to='/spaces/add' className="btn btn-default">Add</Link>
        </div>
    );
  }
}

export default MySpaces;
