import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './App.css';
import SpaceDetails from './SpaceDetails';

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
      arr.push(<SpaceDetails space={this.state.spaces[key]} /><Link to='/spaces/edit' className="btn btn-default">Edit</Link>);
    }
    return arr;
  }

  render() {
    return (
        <div style={{ paddingTop: `50px` }}>
            <h4>Spaces</h4>
            {this.renderSpaces()}
            <Link to='/spaces/add' className="btn btn-default">Add</Link>
        </div>
    );
  }
}

export default MySpaces;
