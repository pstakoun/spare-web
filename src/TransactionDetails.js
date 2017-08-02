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
      <tr>
        <th>{this.state.space ? this.state.space.address : null}</th>
        <th>{this.state.space ? this.state.space.size : null}</th>
        <th>{this.props.trans.time}</th>
        <th>{this.props.trans.paymentToken.card.brand} {this.props.trans.paymentToken.card.last4}</th>
      </tr>
    );
  }
}

export default TransactionDetails;
