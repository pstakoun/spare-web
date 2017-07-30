import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';

class Checkout extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.stripe.createToken({name: 'Peter Stakoun'}).then(({token}) => {
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
