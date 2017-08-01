import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Button } from 'react-bootstrap';
import './App.css';
import SpaceDetails from './SpaceDetails';

class MySpaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  spaces: null
    };
    firebase.database().ref('spaces').orderByChild('user').equalTo(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      this.setState({ spaces: snapshot.val() });
    });
  }

  renderSpaces() {
    var arr = [];
    for (var key in this.state.spaces) {
      arr.push(<SpaceDetails space={this.state.spaces[key]} />);
    }
    return arr;
  }

  render() {
    return (
        <div style={{ paddingTop: `50px` }}>
            <h4>Spaces</h4>
            {this.renderSpaces()}
            <Button onClick={this.props.handleAdd}>Add</Button>
        </div>
    );
  }
}

export default MySpaces;
