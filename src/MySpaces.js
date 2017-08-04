import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import SpaceListing from './SpaceListing';

class MySpaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
	     spaces: null
    };
  }

  componentDidMount() {
    firebase.database().ref('spaces').orderByChild('user').equalTo(firebase.auth().currentUser.uid).on('value', (snapshot) => this.setState({ spaces: snapshot.val() }));
  }

  renderSpaces() {
    var arr = [];
    for (var key in this.state.spaces) {
      if (this.state.spaces[key].status == "active"){
        arr.push(
          <Panel className="listingPanel">
            <SpaceListing space={this.state.spaces[key]} editSpace={this.props.editSpace.bind(this)} />
          </Panel>
        );
      }
    }
    return arr;
  }

  render() {
    return (
        <div>
            <h1>MY SPACES</h1>
            <Link to='/spaces/add' className="profile-button btn btn-default">Add A New Space</Link>
            {this.renderSpaces()}
        </div>
    );
  }
}

export default MySpaces;
