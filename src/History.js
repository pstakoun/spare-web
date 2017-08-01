import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import TransactionDetails from './TransactionDetails';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  trans: null
    };
  }

  componentDidMount() {
    firebase.database().ref('trans').orderByChild('userId').equalTo(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      this.setState({ trans: snapshot.val() });
    });
  }

  renderTransactions() {
    var arr = [];
    for (var key in this.state.trans) {
      arr.push(<TransactionDetails trans={this.state.trans[key]} />);
    }
    return arr;
  }

  render() {
    return (
        <div style={{ paddingTop: `50px` }}>
            <h4>HISTORY</h4>
            {this.renderTransactions()}
        </div>
    );
  }
}

export default History;
