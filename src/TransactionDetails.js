import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import * as firebase from 'firebase';

class TransactionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      space: null
    }
  }

  componentDidMount() {
    firebase.database().ref('spaces/' + this.props.trans.spaceId).on('value', function(snapshot) {
      this.setState({ space: snapshot.val() });
    }.bind(this));
  }

  render() {
    return (
      <Panel>
        <h2>{this.state.space ? this.state.space.address : null}</h2>
        <h2>{this.props.trans.time}</h2>
      </Panel>
    );
  }
}

export default TransactionDetails;
