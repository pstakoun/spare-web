import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  trans: null
    };
    firebase.database().ref('trans').orderByChild('userId').equalTo(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      this.setState({ trans: snapshot.val() });
    });
  }

  render() {
    return (
        <div style={{ paddingTop: `50px` }}>
            <h4>HISTORY</h4>
            <p>{JSON.stringify(this.state.trans)}</p>
        </div>
    );
  }
}

export default History;
