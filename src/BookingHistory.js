import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import BookingDetails from './BookingDetails';

class BookingHistory extends Component  {
  constructor(props) {
    super(props);
    this.state = {
	    trans: null,
      spaceId: this.props.space ? this.props.space.spaceId : null
    };
  }

  componentDidMount() {
    firebase.database().ref('trans/').orderByChild('spaceId').equalTo(this.state.spaceId).on('value', (snapshot) => {
      this.setState({ trans: snapshot.val() });
    });
  }

  renderBookingHistory() {
    var arr = [];
    for (var key in this.state.trans) {
      arr.push(<Col md={12}><BookingDetails trans={this.state.trans[key]} /></Col>);
      setTimeout(1000);
    }
    return arr;
  }

  render() {
    return (
      <div>
	    {!this.state.spaceId && <Redirect to='/spaces' />}
        <h1>BOOKING HISTORY</h1>
        {this.renderBookingHistory()}
      </div>
    );
  }
}

export default BookingHistory;
