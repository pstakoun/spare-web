import React, { Component } from 'react';
import * as firebase from 'firebase';
import { injectStripe, CardElement } from 'react-stripe-elements';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
  	  fname: null,
  	  lname: null,
  	  email: null,
  	  phone: null
    };
  }

  componentDidMount() {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', (snapshot) => this.setState({ fname: snapshot.val().fname, lname: snapshot.val().lname, email: snapshot.val().email, phone: snapshot.val().phone }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.stripe.createToken({name: this.state.fname + ' ' + this.state.lname, email: this.state.email}).then(({token}) => {
      console.log('Received Stripe token:', token);
      this.props.handlePayment(token);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button>Pay</button>
      </form>
    );
  }
}

export default injectStripe(Checkout);
